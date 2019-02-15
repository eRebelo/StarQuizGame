import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import StarQuizHome from '../components/starquiz/StarQuizHome'
import StarQuizGame from '../components/starquiz/StarQuizGame'
import Ranking from '../components/ranking/Ranking'
import Info from '../components/info/info'
import About from '../components/about/about'
import CleanLocalStorage from '../components/starquiz/StarQuizCleanLocalStorage'

export default props => (
    <Router history={hashHistory}>
        <Route path='/home' component={StarQuizHome} />
        <Route path='/game' component={StarQuizGame} />
        <Route path='/ranking' component={Ranking} />
        <Route path='/info' component={Info} />
        <Route path='/about' component={About} />
        <Route path='/clean' component={CleanLocalStorage} />
        <Redirect from='*' to='/home' />
    </Router>
)