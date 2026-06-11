import { ComponentType, FC, JSX } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'redux/redux-store';
import { Navigation } from '../@types/navigation';

type MapStateToPropsForRedirect = {
  isAuth: boolean;
};

const mapStateToPropsForRedirect = (state: RootState) => ({
  isAuth: state.auth.isAuth,
});

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
  MyComponent: ComponentType<WCP>
) {
  const RedirectComponent: FC<MapStateToPropsForRedirect> = (props) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Navigate to={`${Navigation.Login}`} />;

    return <MyComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapStateToPropsForRedirect,
    {},
    WCP,
    RootState
  >(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
