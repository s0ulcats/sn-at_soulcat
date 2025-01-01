import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { Component, FC, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader.tsx';
import Header from './components/Header/Header.tsx';
import { Login } from './components/Login/Login.tsx';
import Music from './components/Music/Music.tsx';
import News from './components/News/News.tsx';
import Settings from './components/Settings/Settings.tsx';
import { UsersPage } from './components/Users/UsersContainer.tsx';
import { initializeApp } from './redux/app-reducer.ts';
import store, { AppStateType } from './redux/reduxStore.ts';

const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout

const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert('some err occured')
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
      <Header />
      <Content style={{padding: '0 50px'}}>
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
              <Sider className="site-layout-background" width={200}>
                  <Menu
                      mode="inline"
                      /*  defaultSelectedKeys={['7']}*/
                      /*  defaultOpenKeys={['sub1']}*/
                      style={{height: '100%'}}
                  >
                      <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                          <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                          <Menu.Item key="2"> <Link to="/chat">Chat</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                          <Menu.Item key="5"><Link to="/users">Users</Link></Menu.Item>
                      </SubMenu>
                  </Menu>
              </Sider>
              <Content style={{padding: '0 24px', minHeight: 280}}>

              <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
                <Route path='/' element={<ProfileContainer />} />
                <Route path='/profile' element={<ProfileContainer />} />
                <Route path='/profile/:userId' element={<ProfileContainer />} />
                <Route path='/messages' element={<MessagesContainer />} />
                <Route path='/login' element={<Login />} />
                <Route path='/news' element={<News />} />
                <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
                <Route path='/music' element={<Music />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='*' element={<div>404</div>} />
            </Routes>
          </Suspense>

              </Content>
          </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>Soulcats Social Network ©2024 Created by s0ulcats</Footer>
  </Layout>
      // <div className='app-wrapper'>
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className='app-wrapper-content'>
          // <Suspense fallback={<div><Preloader /></div>}>
          //   <Routes>
          //       <Route path='/' element={<ProfileContainer />} />
          //       <Route path='/profile' element={<ProfileContainer />} />
          //       <Route path='/profile/:userId' element={<ProfileContainer />} />
          //       <Route path='/messages' element={<MessagesContainer />} />
          //       <Route path='/login' element={<Login />} />
          //       <Route path='/news' element={<News />} />
          //       <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
          //       <Route path='/music' element={<Music />} />
          //       <Route path='/settings' element={<Settings />} />
          //       <Route path='*' element={<div>404</div>} />
          //   </Routes>
          // </Suspense>
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }))(App);

const SoulJsApp: FC = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  )
}

export default SoulJsApp