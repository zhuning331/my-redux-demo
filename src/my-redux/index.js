import React from 'react';

const createStore = rootReducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = rootReducer(state, action);
        listeners.forEach(listener => listener(state));
    }

    const subscribe = listener => {
        listeners.push(listener);
    }

    dispatch({}); // dispatch a empty action to initialize state

    return { getState, dispatch, subscribe };
}

const combineReducers = reducers => {
    const nextState = {};
    const reducerFunctions = {};
    const reducerKeys = Object.keys(reducers);

    // filter out not function of reducer
    reducerKeys.forEach(reducerKey => {
        if (typeof reducers[reducerKey] === 'function') {
            reducerFunctions[reducerKey] = reducers[reducerKey];
        }
    });
    const reducerFunctionKeys = Object.keys(reducerFunctions);

    // return a combined new reducer function
    return (state = {}, action) => {
        reducerFunctionKeys.forEach(reducerFunctionKey => {
            const reducer = reducerFunctions[reducerFunctionKey];
            nextState[reducerFunctionKeys] = reducer(state[reducerFunctionKeys], action);
        })
        return nextState;
    }
}

const ReduxContext = React.createContext('redux');
const Provider = ({ store, children }) => {
    return <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
}

const connect = (mapStateToProps, mapDispatchToProps) => Component => {  
    class Connect extends React.Component {
        constructor(props) {
            super(props);
            this.state = props.store.getState();
        }
  
        componentDidMount() {
            this.props.store.subscribe(state => {
                this.setState(state);
            });
        }
  
        render() {
            const { store } = this.props;
            return (
                <Component
                    {...this.props}
                    {...mapStateToProps(store.getState())}
                    {...mapDispatchToProps(store.dispatch)}
                />
            );
        }
    }
  
    return props => (
        <ReduxContext.Consumer>
            {store => <Connect {...props} store={store} />}
        </ReduxContext.Consumer>
    );
  };

export { createStore, combineReducers, Provider, connect };