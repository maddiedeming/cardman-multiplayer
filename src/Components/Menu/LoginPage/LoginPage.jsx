import React, { Component } from 'react'
import './LoginPage.css'
import { VERIFY_USERNAME } from '../../../Shared/Events'
import { POPUP_GENERIC } from '../../Popup/Types'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if (this.props.socket !== null) {
            this.props.history.push('/menu')
        }
    }

    loginHandler = () => {
        let nickname = this.inputRef.current.value
        const { socket } = this.props
        if (nickname.length <= 1) {
            this.props.addPopup({
                type: POPUP_GENERIC,
                popupData: {
                    title: 'Error!',
                    content: '<p>Your nickname has to be longer.</p>'
                }
            })
            return
        }
        socket.emit(VERIFY_USERNAME, nickname, ({ player, isTaken }) => {
            if (isTaken) {
                this.props.addPopup({
                    type: POPUP_GENERIC,
                    popupData: {
                        title: 'Error!',
                        content: '<p>This nickname is taken.</p>'
                    }
                })
            } else {
                this.props.setTitle({ title: 'Menu' })
                this.props.loginPlayer(player)
            }
        })
    }

    submitOnEnter = key => {
        if (key.which === 13) {
            this.loginHandler()
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='menu'>
                    <div className='infoNickname border-neon border-neon-violet'>
                        <p>Please enter your nickname</p>
                    </div>
                    <div className='nickname-input'>
                        <input
                            ref={this.inputRef}
                            type='text'
                            maxLength='15'
                            className='inputNickname border-neon border-neon-red'
                            onKeyDown={this.submitOnEnter}
                        />
                        <button
                            className='button-pointer border-neon border-neon-orange'
                            onClick={this.loginHandler}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(LoginPage)
