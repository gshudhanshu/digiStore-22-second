import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreens from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import TransactionScreen from './screens/TransactionScreen'
import ScratchCardScreen from './screens/ScratchCardScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import BottomNav from './components/BottomNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StaffLogin from './screens/StaffLogin'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <BreadcrumbsProvider>
      <Router>
        <Header />
        <ToastContainer autoClose={2000} position='top-center' theme='dark' />
        <main>
          <Routes>
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/staff-login' element={<StaffLogin />} />
            <Route path='/forget-password' element={<ForgetPasswordScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/transactions' element={<TransactionScreen />} />
            {userInfo && userInfo.isStaff && (
              <Route path='/' element={<ScratchCardScreen />} />
            )}
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
            />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/search/:keyword' element={<HomeScreens />} />
            <Route path='/page/:pageNumber' element={<HomeScreens />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreens />}
            />
            <Route path='/' element={<HomeScreens />} />
            <Route path='*' element={<NotFoundScreen />} />

            {/* <Route
              path='/'
              element={
                firstLoad ? <Navigate replace to='/login' /> : <HomeScreens />
              }
            /> */}
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </Router>
    </BreadcrumbsProvider>
  )
}

export default App
