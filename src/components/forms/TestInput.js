import React from 'react'
import Formsy from 'formsy-react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import Editor from './editor/Editor'

// Test text input
const TestTextInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value)
  },
  render: function () {

    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null

    var errorMessage = this.getErrorMessage()
    
    return (
      <div className={className}>
        <TextField
          onChange={this.changeValue}
          floatingLabelText={this.props.label}
          value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    )
  }
})

// Test password input
const TestPasswordInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value)
  },
  render: function () {

    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null

    var errorMessage = this.getErrorMessage()
    
    return (
      <div className={className}>
        <TextField
          onChange={this.changeValue}
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    )
  }
})

// Test Rating Input
const TestRatingInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.target.value)
  },
  render: function () {

    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null

    var errorMessage = this.getErrorMessage()
    
    let menuItems = [
      {"payload": null, "text": "Select a Rating"},
      {"payload": 0, "text": "No Stars"},
      {"payload": 1, "text": "1 Star"},
      {"payload": 2, "text": "2 Stars"}, 
      {"payload": 3, "text": "3 Stars"},
      {"payload": 4, "text": "4 Stars"},
      {"payload": 5, "text": "5 Stars"}
    ]
    
    return (
      <div className={className}>
        <SelectField
          onChange={this.changeValue}
          label="Star Rating"
          floatingLabelText='Select a Rating'
          menuItems={menuItems}
          value={this.state._value}/>
        <span>{errorMessage}</span>
      </div>
    )
  }
})

//Test WYSIWYG Input
const TestWysiwygInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event)
  },
  render: function () {

    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null

    var errorMessage = this.getErrorMessage()
    
    return (
      <div className={className}>
        <Editor
          onChange={this.changeValue}
          toolbar={false}
          value={this.state._value}/>
      </div>
    )
  }
})

export default {TestTextInput, TestPasswordInput, TestRatingInput, TestWysiwygInput}