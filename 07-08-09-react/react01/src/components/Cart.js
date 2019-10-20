import React from 'react';

function Cart({ data, addCount, minusCount }) {
  return (
    <table>
      <tbody>
      {
        data.map((good, index) => (
          <tr key={good.id}>
            <td>{ good.name }</td>
            <td>
              <button onClick={ () => minusCount(index) }>-</button>
              { good.count }
              <button onClick={ () => addCount(index) }>+</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default Cart;