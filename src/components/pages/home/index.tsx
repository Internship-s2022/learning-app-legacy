import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Action, decrement, increment } from 'src/redux/modules/user/actions';
import { RootState } from 'src/redux/store';

import styles from './home.module.css';

const Home = (): JSX.Element => {
  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch: Dispatch<Action> = useDispatch();

  return (
    <section className={styles.container}>
      <h2>Home screen.</h2>
      <div>
        <button onClick={() => dispatch(increment(1))}>+</button>
        <p>
          <>{counter}</>
        </p>
        <button onClick={() => dispatch(decrement(1))}>-</button>
      </div>
    </section>
  );
};

export default Home;
