'use strict'

var React = require('react')
var QuillToolbar = require('./EditorToolbar')
var QuillMixin = require('./EditorMixin')
var T = React.PropTypes

// Support React 0.11 and 0.12
// FIXME: Remove with React 0.13
// TODO Remove as noted
if (React.createFactory) {
	QuillToolbar = React.createFactory(QuillToolbar)
}

// Support React 0.12 and 0.13+
// FIXME: Remove with React 0.13
// TODO Remove as noted
if (React.cloneElement) {
	var cloneElement = React.cloneElement
} else if (React.addons && React.addons.cloneWithProps) {
	var cloneElement = React.addons.cloneWithProps
} else {
	throw new Error('React addons are required when using React 0.12 or less.')
}

const Editor = React.createClass({

	displayName: 'Quill',

	mixins: [ QuillMixin ],

	propTypes: {
		id: T.string,
		className: T.string,
		style: T.object,
		value: T.string,
		defaultValue: T.string,
		readOnly: T.bool,
		modules: T.object,
		toolbar: T.oneOfType([ T.array, T.oneOf([false]), ]),
		formats: T.array,
		styles: T.oneOfType([ T.object, T.oneOf([false]) ]),
		theme: T.string,
		pollInterval: T.number,
		onKeyPress: T.func,
		onKeyDown: T.func,
		onKeyUp: T.func,
		onChange: T.func,
		onChangeSelection: T.func
	},

	/*
	Changing one of these props should cause a re-render.
	*/
	dirtyProps: [
		'id',
		'className',
		'modules',
		'toolbar',
		'formats',
		'styles',
		'theme',
		'pollInterval'
	],

	getDefaultProps() {
		return {
			className: '',
			theme: 'base',
			modules: {
				'link-tooltip': true
			}
		}
	},

	/*
	We consider the component to be controlled if
	whenever `value` is bein sent in props.
	*/
	isControlled() {
		return 'value' in this.props
	},

	getInitialState() {
		return {
			value: this.isControlled()
				? this.props.value
				: this.props.defaultValue
		}
	},

	componentWillReceiveProps(nextProps) {
		var editor = this.state.editor
		// If the component is unmounted and mounted too quickly
		// an error is thrown in setEditorContents since editor is
		// still undefined. Must check if editor is undefined
		// before performing this call.
		if (editor) {
			// Update only if we've been passed a new `value`.
			// This leaves components using `defaultValue` alone.
			if ('value' in nextProps) {
				// NOTE: Seeing that Quill is missing a way to prevent
				//       edits, we have to settle for a hybrid between
				//       controlled and uncontrolled mode. We can't prevent
				//       the change, but we'll still override content
				//       whenever `value` differs from current state.
				if (nextProps.value !== this.getEditorContents()) {
					this.setEditorContents(editor, nextProps.value)
				}
			}
			// We can update readOnly state in-place.
			if ('readOnly' in nextProps) {
				if (nextProps.readOnly !== this.props.readOnly) {
					this.setEditorReadOnly(editor, nextProps.readOnly)
				}
			}
		}
	},

	componentDidMount() {
		var editor = this.createEditor(
			this.getEditorElement(),
			this.getEditorConfig())

		this.setCustomFormats(editor)

		// NOTE: Custom formats will be stripped when creating
		//       the editor, since they are not present there yet.
		//       Therefore, we re-set the contents from state.
		this.setState({ editor:editor }, function() {
			this.setEditorContents(editor, this.state.value)
		}.bind(this))
	},

	componentWillUnmount() {
		this.destroyEditor(this.state.editor)
		// NOTE: Don't set the state to null here
		//       as it would generate a loop.
	},

	shouldComponentUpdate(nextProps, nextState) {
		// Check if one of the changes should trigger a re-render.
		for (var i=0; i<this.dirtyProps.length; i++) {
			var prop = this.dirtyProps[i]
			if (nextProps[prop] !== this.props[prop]) {
				return true
			}
		}
		// Never re-render otherwise.
		return false
	},

	/*
	If for whatever reason we are rendering again,
	we should tear down the editor and bring it up
	again.
	*/
	componentWillUpdate() {
		this.componentWillUnmount()
	},

	componentDidUpdate() {
		this.componentDidMount()
	},

	setCustomFormats(editor) {
		if (!this.props.formats) {
			return
		}

		for (var i = 0; i < this.props.formats.length; i++) {
			var format = this.props.formats[i]
			editor.addFormat(format.name || format, format)
		}
	},

	getEditorConfig() {
		var config = {
			readOnly:     this.props.readOnly,
			theme:        this.props.theme,
			// Let Quill set the defaults, if no formats supplied
			formats:      this.props.formats ? [] : undefined,
			styles:       this.props.styles,
			modules:      this.props.modules,
			pollInterval: this.props.pollInterval
		}
		// Unless we're redefining the toolbar, or it has been explicitly
		// disabled, attach to the default one as a ref.
		if (this.props.toolbar !== false && !config.modules.toolbar) {
			// Don't mutate the original modules
			// because it's shared between components.
			config.modules = JSON.parse(JSON.stringify(config.modules))
			config.modules.toolbar = {
				container: this.refs.toolbar.getDOMNode()
			}
		}
		return config;
	},

	getEditor() {
		return this.state.editor
	},

	getEditorElement() {
		return this.refs.editor.getDOMNode()
	},

	getEditorContents() {
		return this.state.value
	},

	getEditorSelection() {
		return this.state.selection
	},

	/*
	Renders either the specified contents, or a default
	configuration of toolbar and contents area.
	*/
	renderContents() {
		if (React.Children.count(this.props.children)) {
			// Clone children to own their refs.
			return React.Children.map(
				this.props.children,
				function(c) { return cloneElement(c, { ref: c.ref }) }
			)
		} else {
			return [
				// Quill modifies these elements in-place,
				// so we need to re-render them every time.

				// Render the toolbar unless explicitly disabled.
				this.props.toolbar !== false? QuillToolbar({
					key: 'toolbar-' + Math.random(),
					ref: 'toolbar',
					items: this.props.toolbar
				}) : false,

				React.DOM.div({
					key: 'editor-' + Math.random(),
					ref: 'editor',
					className: 'quill-contents',
					dangerouslySetInnerHTML: { __html:this.getEditorContents() }
				})
			];
		}
	},

	render() {
		return React.DOM.div({
			id: this.props.id,
			style: this.props.style,
			className: 'quill ' + this.props.className,
			onKeyPress: this.props.onKeyPress,
			onKeyDown: this.props.onKeyDown,
			onKeyUp: this.props.onKeyUp,
			onChange: this.preventDefault },
			this.renderContents()
		)
	},

	onEditorChange(value, delta, source) {
		if (value !== this.getEditorContents()) {
			this.setState({ value: value })
			if (this.props.onChange) {
				this.props.onChange(value, delta, source)
			}
		}
	},

	onEditorChangeSelection(range, source) {
		var s = this.getEditorSelection() || {}
		var r = range || {}
		if (r.start !== s.start || r.end !== s.end) {
			this.setState({ selection: range })
			if (this.props.onChangeSelection) {
				this.props.onChangeSelection(range, source)
			}
		}
	},

	focus() {
		this.state.editor.focus()
	},

	blur() {
		this.setEditorSelection(this.state.editor, null)
	},

	/*
	Stop change events from the toolbar from
	bubbling up outside.
	*/
	preventDefault(event) {
		event.preventDefault()
		event.stopPropagation()
	}

});

export default Editor
