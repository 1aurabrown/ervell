Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Collaborators = require '../../../collections/collaborators.coffee'
ChannelCollaborationView = require '../../channel/client/channel_collaboration_view.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'

blockTemplate = -> require('../templates/block_manage.jade') arguments...

module.exports = class ManageBlockView extends BlockView
  
  events: 
    'click .manage__block__export_link': 'exportChannel'

  initialize: ->
    super
    collaborators = new Collaborators
      channel_slug: @model.get('slug')

    @collaborationView = new ChannelCollaborationView
      collection: collaborators
      el: @$ ".manage__block__collaborator_count"
  
  render: ->
    @container.append blockTemplate(block: @model, user: @current_user)

  exportChannel: (e)->
    e.preventDefault()

    format = 'json'

    $.ajax
      type: 'POST'
      url: "https://export-are-na.herokuapp.com/#{@model.get('slug')}.#{format}"
      success: (response) => @renderExportStatus(response)
      error: (response) => @renderExportStatus(response)

  renderExportStatus: (status)->
    @$('.manage__block__export').html(status.message)