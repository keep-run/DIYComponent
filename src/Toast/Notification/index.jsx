import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Notice from '../Notice/index'
// import './index.styl'
let counts = 0
//生成唯一的key
const getKey = () => {
  return 'Notification' + counts++
}
class Notification extends Component {
  state = {
    notices: [], //存储notices
    hasMask: true,//是否显示蒙层
  }

  //添加蒙层
  add(notice) {
    const { notices } = this.state;
    const key = notice.key ? notice.key : notice.key = getKey();
    const mask = notice.mask || false;
    const exist = notices.filter(item => item.key == key).length > 0   //是否已经存在
    // 不存在就添加一个notice
    if (!exist) {
      notices.push(notice);
      this.setState({ notices, hasMask: mask })
    }
  }

  //根据指定的key 删除notice
  remove(key) {
    this.setState(prevState => {
      return {
        notices: prevState.notices.filter(item => item.key !== key)
      }
    })
  }


  //关闭toast的回调
  closeCallBack = (notice) => {
    this.remove(notice.key);
    // 如果自定义了notice的关闭回调函数，则执行他
    if (notice.onClose) {
      notice.onClose()
    }
  }

  //生成tosat的dom节点
  getNoticeDOM() {
    const { notices } = this.state
    return notices.map(item => <Notice key={item.key} onClose={()=>this.closeCallBack(item)} data={item} />)
  }

  //获取蒙层的dom
  getMaskDOM() {
    const { notices, hasMask } = this.state
    return (notices.length > 0 && hasMask) ? <div className='notice-mask' /> : null
  }

  render() {
    return (<div className='notice-wrap'>
      {this.getMaskDOM()}
      {this.getNoticeDOM()}
    </div>)
  }
}

//该方法实现组件动态添加到页面中
Notification.reWrite = function (properities) {
  const { ...props } = properities || {}
  let div = document.createElement('div')
  document.body.appendChild(div)
  const notification =ReactDOM.render(<Notification {...props} />, div)
  return {
    notice(noticeProps) {
      notification.add(noticeProps)
    },
  
    removeNotice(key){
      notification.remove(key)
    },
    destory(){
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    },
    component:notification
  }
}

export default Notification