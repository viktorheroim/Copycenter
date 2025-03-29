import React, {useState} from 'react'

const CounterLikes = () => {
    const [like, setLike] = useState(0)
    const [value, setValue] = useState('Текст в инпуте')

    function Up () {
        setLike(like + 1)
    }

    function Down () {
        setLike(like - 1)
    }

    return (
        <div className='like'>
            <h1>{like}</h1>
            <h1>{value}</h1>
            <input
                type='text'
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <button onClick={Up}>Up</button>
            <button onClick={Down}>Dowm</button>
        </div>
    );
}

export default CounterLikes;