import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../style/robinInput.less'

class RobinInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
    valueHandle: PropTypes.func.isRequired,
    onEnter: PropTypes.func
  }
  static defaultProps = {
    value: '',
    width: 300,
    label: '输入内容',
    placeholder: '请输入内容',
    type: 'text',
    fullWidth: false,
    autoFocus: false
  }

  setWidth (width) {
    if (parseInt(width, 10) === width) return `${width}px`
    else if (typeof width === 'string') return width
  }
  updateValue (e) {
    const {value} = e.target
    const {valueHandle} = this.props
    valueHandle && valueHandle(value)
  }
  handleKeypress (e) {
    const {onEnter} = this.props
    e.key === 'Enter' && onEnter && onEnter()
  }

  componentDidMount () {
    if (this.props.autoFocus) this.refs.input.focus()
  }
  render () {
    const {value, label, placeholder, width, type} = this.props

    return <label className="robin-input iblock font-14 relative m-t-20" style={{width: this.setWidth(width)}}>
      <input type={type} value={value} autoComplete="new-password" onChange={e => this.updateValue(e)} className={(value ? 'not-empty ' : '') + 'font-14 p-h-10'} ref="input" onKeyPress={e => this.handleKeypress(e)} />
      <div className="hint-text absolute p-h-10">{value ? label : placeholder}</div>
    </label>
  }
}

export default RobinInput