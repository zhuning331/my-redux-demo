import { connect } from '../my-redux';
import { incrementAction, decrementAction } from '../actions/counterAction';

const Counter = ({ value, increment, decrement }) => {
    return (
        <div>
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        value: state.counter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch(incrementAction()),
        decrement: () => dispatch(decrementAction())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);