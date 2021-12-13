import React, { Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
// routes config
import routes from '../routes'



const AppContent = () => {

  const [status, setStatus] = useState('');

  useEffect(() => {
    window.FB.getLoginStatus(function (response) {
      // statusChangeCallback(response);
      console.log("Response: ", response)
      setStatus(response.status)
    });
  }, [])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          {
            status !== '' && (
              status === 'connected' ?
                <Redirect from="/" to="/dashboard" /> :
                <Redirect from="/" to="/Login" />
            )
          }
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
