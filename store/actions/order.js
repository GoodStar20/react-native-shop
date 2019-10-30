export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const PLACE_ORDER = 'PLACE_ORDER';

export const addOrder = (bool) => {
  return {
    type: ADD_ORDER, bool:bool
  }
}


export const placeOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    //  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwYjQwY2NjYmQ0OWQxNmVkMjg2MGRiNzIyNmQ3NDZiNmZhZmRmYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcC03NzNiMCIsImF1ZCI6InNob3AtNzczYjAiLCJhdXRoX3RpbWUiOjE1NzIxMTk3MjEsInVzZXJfaWQiOiJQZmlHRGV5STgxUWRuOXlqMHJLTGNGamJkS1YyIiwic3ViIjoiUGZpR0RleUk4MVFkbjl5ajByS0xjRmpiZEtWMiIsImlhdCI6MTU3MjExOTcyMSwiZXhwIjoxNTcyMTIzMzIxLCJlbWFpbCI6Ind3Lnd3QHd3Lnd3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInd3Lnd3QHd3Lnd3Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.CeuyI8c0FGa7d9H0qRhoprQFH-zTykLv7CMPtl5TQJhRZRABNxkinI9gg1N-iIHATrRFX2-ANUsbt9Nq-651K0UzHTHVA5eweXq13fL5iVrF8Z2QE88iNni9qTZ32mcAqUvOrQpyv5srRNLf1iqMw7ln1bwicC4CAbly6_pJZLdRnUYiwWs_XfBtquwurDWbYGngvARonyjd3cryUrY5BSQtbZvJupUJwQOVxcz2L3FYLasjdvuOTmGvYklXIAU-ZXLm64q3FYg5E8aHvpf1-6Tkl8oqcLLOWnWs-PBsh_QznyEwW3moEq5OHiKk93huYl88QxCcKcfq0ZqdM0IQig';
    //  const userId = 'PfiGDeyI81Qdn9yj0rKLcFjbdKV2';

    const date = new Date();
    const response = await fetch(
      `https://shop-773b0.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    dispatch({
      type: PLACE_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    }); 
  };
};

export const removeOrder = () => {
  return { type: REMOVE_ORDER }
}