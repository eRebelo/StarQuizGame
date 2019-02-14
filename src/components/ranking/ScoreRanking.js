import React, { Component } from 'react'
import { hashHistory } from 'react-router';

class Ranking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scores: []
        };
    }

    componentWillMount() {
        let localScores = JSON.parse(localStorage.getItem("scores") || "[]");
        // Sort scores object
        localScores.sort(function (obj1, obj2) {
            return obj2.score - obj1.score;
        });
        this.setState({ scores: localScores });
    }

    render() {
        const { scores } = this.state;
        return (
            <div className='container container-ranking'>
                {scores.map((item, index) => (
                    <div className='row' key={index}>
                        <div className='col-md-3'>
                            <label>Nome: {item.name}</label>
                        </div>
                        <div className='col-md-3'>
                            <label>Email: {item.email}</label>
                        </div>
                        <div className='col-md-3'>
                            <label>Score: {item.score}</label>
                        </div>
                    </div>
                ))}
                <div className='row'>
                    <div className='col-md-12'>
                        <button type='button' className='btn btn-play-ranking' onClick={() => { hashHistory.push('/game') }} >Jogar Novamente</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Ranking;