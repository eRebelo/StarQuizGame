import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import StarQuizHome from '../components/starquiz/StarQuizHome'
import StarQuizGame from '../components/starquiz/StarQuizGame'
import Ranking from '../components/ranking/ranking'
import Info from '../components/info/info'
import About from '../components/about/about'

export default props => (
    <Router history={hashHistory}>
        <Route path='/home' component={StarQuizHome} />
        <Route path='/game' component={StarQuizGame} />
        <Route path='/ranking' component={Ranking} />
        <Route path='/info' component={Info} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/home' />
    </Router>
)