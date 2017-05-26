Backbone = require 'backbone'
Promise = require 'bluebird-q'
{ QUERY, PROFILE_CHANNELS, SORT, USER } = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
User = require '../../../models/user.coffee'
CurrentUser = require '../../../models/current_user.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
ChannelGroupView = require '../../../components/channel_block_group/view.coffee'

template = -> require('../templates/partials/_channel_groups.jade') arguments...

class ProfileView extends Backbone.View
  loading: false
  disabled: false
  threshold: -500
  page: 2

  events: 
    'keyup .js-channel-filter' : 'searchChannels'

  initialize: ->
    @timer = setInterval @maybeLoad, 150
    @user = CurrentUser.orNull()

  maybeLoad: =>
    return false if @loading or 
      @disabled or 
      mediator.shared.state.get 'lightbox'

    total = document.body.scrollHeight
    scrollPos = (document.documentElement.scrollTop || document.body.scrollTop)
    progress = scrollPos + window.innerHeight * 6

    if (total - progress < @threshold)
      @loadNextPage() 

  query: ->
    @$('.js-channel-filter').val()

  searchChannels: ->
    @page = 1
    @disabled = false
    @fetchResults().then (results) =>
      @replaceResults(results.channels)

  getQuery: ->
    @query() or QUERY

  fetchResults: ->
    Promise $.ajax 
      url: "/api/#{sd.USER.slug}/channels"
      data: 
        page: @page
        q: @getQuery()
        sort: SORT
  
  appendResults: (channels) ->
    @$('.js-user-channels-contents').append template 
      channels: channels
      user: @user

  replaceResults: (channels) ->
    @$('.js-user-channels-contents').html template 
      channels: channels
      user: @user

  loadNextPage: ->
    @startLoader()
    @fetchResults()
      .then (response) =>
        @page++
        @stopLoader()
        if response.channels.length
          @appendResults(response.channels)
          @setUpChannelGroupViews(response.channels)
        else
          @disabled = true
      .catch =>
        @stopLoader()

  startLoader: ->
    @loading = true
    $('#l-infinite-loader-container').addClass 'is-loading'

  stopLoader: ->
    @loading = false
    $('#l-infinite-loader-container').removeClass 'is-loading'

  setUpChannelGroupViews: (channels) ->
    for channel in channels
      view = new ChannelGroupView
        channel: channel
        el: @$(".ChannelBlockGroup[data-id=#{channel.id}]")
      
      view.initBlockViews()
      
module.exports.init = ->
  user = new User USER

  view = new ProfileView
    el: $('.js-user-channels')

  view.setUpChannelGroupViews(PROFILE_CHANNELS)

  new PathView
    el: $('section.path--header')
    model: user

  new MetaEditableAttributeView
    model: user
    el: $("#metadata--about .metadata__content")
    _attribute: 'description'
    _kind: 'markdown'
    wait: true