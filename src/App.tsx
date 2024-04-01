import { Toaster } from 'react-hot-toast';

import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { userCart } from './hooks/useCart';

function App() {     
  const {
    addToCart,
    cartTotal,
    clearCart,
    dataCart,
    dataPage,
    decreseQuantity,
    deleteFromCart,
    increseQuantity,
    isEmpty
  } = userCart();
    
  return (
    <>
      <Header
        clearCart={clearCart}
        selectedGuitars={dataCart}        
        updateDataCart={deleteFromCart}
        increseQuantity={increseQuantity}
        decreseQuantity={decreseQuantity}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      ></Header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>        
        <div className="row mt-5">
          { 
            dataPage.map((guitar, index) => {
              return <Guitar
                key={index}
                guitar={guitar}                                
                addToCart={addToCart}
              />
            })
          }          
        </div>
      </main>

      <Footer />

      <Toaster position='top-left'/>
    </>
  );
}

export default App
