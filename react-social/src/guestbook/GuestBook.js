import React, { useState, Fragment, useEffect, useRef } from 'react'
import { TextField, Divider, IconButton, makeStyles, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Directions, ExpandMore, Person } from '@material-ui/icons'
import moment from 'moment'
import { url } from '../common/value'
import axios from 'axios'
import { GUESTBOOK_URL, ACCESS_TOKEN, API_BASE_URL } from '../constants'
import LoadingIndicator from '../common/LoadingIndicator'

function GuestBook({ auth }) {
    // const [comment, setComment] = useState([{time:"2020.09.28",content:[{id:'text', comment:"메롱"}, {id:'tes1t', comment:'라리룰라'}] }, {time:"2020.09.30", content:[{id:'test', comment:'ㅇㄹㅇㄹㅇ'}]}, {time:"2020.10.01", content:[{id:'test', comment:'ㄴㄹㅇㄹㄴㅇ'}]}])
    const [value, setValue] = useState('')
    const [comment, setComment] = useState(null)
    const [loading, setLoading] = useState(true)

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '95%',
            border: '1px solid black',
            margin: '0 auto'
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        divider: {
            height: '100%',
            margin: 4
        },
        profileImage:{
            width: '10%',
            height: '30%',
            marginRight:'4%'
        }
    }))
    const style = useStyles()

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            addComment()
        }
    }
    const today = moment().format('YYYY.MM.DD')

    const valueRef = useRef()

    const addComment = async() => {
        if (auth) {
            setLoading(true)
            await axios.post(`${API_BASE_URL}/guestbook`, {comment: valueRef.current.value}, {
                headers:{Authorization: `${localStorage.getItem(ACCESS_TOKEN)}`},
            }).then(response => {
                console.log(response.code)
                setLoading(false)
            }).catch(e => {
                console.log(e)
                setLoading(false)
            })
        } else {
            alert("로그인 후 이용할 수 있습니다")
        }
    }
    useEffect(() => {
        const info = async () => {
            return await axios.get(GUESTBOOK_URL, {
                headers: { Authorization: `${localStorage.getItem(ACCESS_TOKEN)}` }
            }).then((response) => {
                return response.data
            })
        }
        info()
            .then(response => {
                setComment(response)
                console.log(response)
                setLoading(false)
            })

    }, [loading])
    if (loading) {
        return (
            <LoadingIndicator />
        )
    }
    else {
        return (
            <Fragment>
                <div className={style.root}>
                    <TextField fullWidth inputRef={valueRef} type="text" onKeyPress={pressEnter} placeholder="방명록을 작성해주세요" className={style.input} />
                    <Divider className={style.divider} />
                    <IconButton color='primary' onClick={addComment} >
                        <Directions />
                    </IconButton>
                </div>
                <div style={{ width: '100%', margin: '3px auto' }}>

                    {comment.map((data, i) =>
                        <div className={style.root} key={data.modifiedDate}>
                            {data.user.imageUrl !== null ? <img className={style.profileImage} src={data.user.imageUrl} /> : <Person className={style.profileImage} />}
                            {data.user.name}
                            <Divider className={style.divider} />
                            {data.guestbook}
                        </div>
                    )}
                </div>
            </Fragment>

        )
    }
}

export default GuestBook