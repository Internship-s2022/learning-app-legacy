import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootAction, RootReducer } from 'src/redux/modules';
import { decrement, increment } from 'src/redux/modules/user/actions';

import styles from './home.module.css';

const Home = (): JSX.Element => {
  const counter = useSelector<RootReducer>((state) => state.counter.counter);
  const dispatch: Dispatch<RootAction> = useDispatch();

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
