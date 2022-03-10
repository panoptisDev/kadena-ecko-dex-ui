import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PoolContainer from '../containers/PoolContainer';
import SwapContainer from '../containers/SwapContainer';
import WrapContainer from '../containers/WrapContainer';
import StatsHistoryContainer from '../containers/StatsHistoryContainer';
import AnalyticsContainer from '../containers/AnalyticsContainer';
import GameEditionMenuContainer from '../components/game-edition-v2/GameEditionMenuContainer';
import GameEditionStartAnimation from '../components/game-edition-v2/GameEditionStartAnimation';
import {
  ROUTE_INDEX,
  ROUTE_POOL,
  ROUTE_WRAP,
  ROUTE_STATS,
  ROUTE_GAME_START_ANIMATION,
  ROUTE_GAME_EDITION_MENU,
  ROUTE_ANALYTICS,
  ROUTE_MY_SWAP,
  ROUTE_LIQUIDITY_TOKENS,
  ROUTE_LIQUIDITY_MY_LIQUIDITY,
  ROUTE_LIQUIDITY_POOLS,
  ROUTE_LIQUIDITY_ADD_LIQUIDITY_SINGLE_SIDED,
  ROUTE_LIQUIDITY_ADD_LIQUIDITY_DOUBLE_SIDED,
} from './routes';
import SwapHistoryContainer from '../containers/SwapHistoryContainer';
import { useGameEditionContext } from '../contexts';
import StatsHistoryGameEditionContainer from '../containers/StatsHistoryGameEditionContainer';
import LiquidityContainer from '../containers/LiquidityContainer';
import AddLiquidityContainer from '../components/liquidity/AddLiquidityContainer';

export default () => {
  const { gameEditionView } = useGameEditionContext();
  return (
    <Router>
      <Layout>
        {gameEditionView ? (
          <Switch>
            <Route exact path={ROUTE_GAME_START_ANIMATION} component={GameEditionStartAnimation} />
            <Route exact path={ROUTE_GAME_EDITION_MENU} component={GameEditionMenuContainer} />
            <Route exact path={ROUTE_INDEX} component={SwapContainer} />
            <Route exact path={ROUTE_MY_SWAP} component={SwapHistoryContainer} />
            <Route exact path={ROUTE_STATS} component={StatsHistoryGameEditionContainer} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path={ROUTE_INDEX} component={SwapContainer} />
            <Route exact path={ROUTE_MY_SWAP} component={SwapHistoryContainer} />
            <Route exact path={[ROUTE_LIQUIDITY_TOKENS, ROUTE_LIQUIDITY_POOLS, ROUTE_LIQUIDITY_MY_LIQUIDITY]} component={LiquidityContainer} />
            <Route
              exact
              path={[ROUTE_LIQUIDITY_ADD_LIQUIDITY_SINGLE_SIDED, ROUTE_LIQUIDITY_ADD_LIQUIDITY_DOUBLE_SIDED]}
              component={AddLiquidityContainer}
            />
            <Route exact path={ROUTE_POOL} component={PoolContainer} />
            <Route exact path={ROUTE_STATS} component={StatsHistoryContainer} />
            <Route exact path={ROUTE_ANALYTICS} component={AnalyticsContainer} />
            <Route exact path={ROUTE_WRAP} component={WrapContainer} />
          </Switch>
        )}
      </Layout>
    </Router>
  );
};
