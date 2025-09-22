import {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import Loading from '../components/Loading';
import MobileRouting from './MobileRouting';
import ComingSoon from '../pages/ComingSoon';

const Landing = lazy(() => import('../pages/Landing'));
const Menu = lazy(() => import('../pages/Menu'));
const Status = lazy(() => import('../pages/Status'));
function Routing() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<MobileRouting />}>
          <Route index element={<Landing />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/status' element={<Status />} />

          <Route
            path='*'
            element={
              <>
                <div
                  style={{
                    height: '100vh',
                    backgroundColor: '#e5674e',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                >
                  <h1>NOT FOUND</h1>
                </div>
              </>
            }
          />
        </Route>
        <Route
          path='/coming-soon'
          element={<ComingSoon />}
        />
      </Routes>
    </Suspense>
  );
}

export default Routing;
