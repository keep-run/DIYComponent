//具体的toast组件
import React, { Component } from 'react'

export default class extends Component {
  static defaultProps = {
    duration: 3000
  }
  state = {
    shouldClose: false   //是否开启关闭动画
  }


  componentDidMount() {
    if (this.props.duration > 0) {
      this.closeTimer = setTimeout(this.close, this.props.duration)
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  clearCloseTimer=()=> {
    clearTimeout(this.closeTimer)
    this.closeTimer = null
  }

  //关闭组件: 1、先清除定时器；2、开启关闭动画；3、等待动画结束，执行回调
  close=()=> {
    const _this = this
    _this.clearCloseTimer()
    _this.setState({ shouldClose: true })
    _this.timer = setTimeout(() => {
      if (_this.props.onClose) {
        _this.props.onClose()
      }
      clearTimeout(_this.timer)
    }, 300000)
  }

  render(){
    const {shouldClose}=this.state
    return (<div className='notice-content leave'>
      {this.props.data.content}
    </div>)
  }
}