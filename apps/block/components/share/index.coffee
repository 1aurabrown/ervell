{ truncate } = require 'underscore.string'
BlockShareView = require './view.coffee'

generateText = ({ title }) ->
  truncate(title, 50)

module.exports = ({ $el, block }) ->
  view = new BlockShareView
    text: generateText(block.toJSON())

  $el.html view.render().$el

  view
