import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Toast from '../../src/Toast/index'
class Demo extends PureComponent {
    state = {
        data: [0, 1, 2, 3, 4, 5]
    }

    handleClick = () => {
        const { data } = this.state
        data.unshift(-1)
        this.setState({ data: [...data] })
        // Toast.success('test')
        Toast.success('test')
        // console.log(Toast.show('test'))
    }
    render() {
        const { data } = this.state
        return (<div>
            <button onClick={this.handleClick}>click</button>
            {data.map((item, index) => {
                if (item === 3) {
                    return <div key={index}>div {item}</div>
                }
                return <span key={index}>span {item}</span>
            })}
        </div>)
    }
}
const app = document.getElementById('app')
ReactDOM.render(<Demo />, app)
