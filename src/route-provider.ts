import { LayoutNamesConstants } from "./core/constant/layout-name-constant";
import { PageNamesConstants } from "./core/constant/page-name-constant";
import { TpRoute } from "./core/type/tpRoute";
import Tp1 from "./tp1/tp1";
import Tp2 from "./tp2/tp2";
import Tp3 from "./tp3/tp3";

export default class RouteProvider {
  getRoutes = () => {
    const routes: TpRoute[] = [
      {
        path: PageNamesConstants.Tp1.path,
        name: PageNamesConstants.Tp1.name,
        component: Tp1,
        layout: LayoutNamesConstants.Main,
      },
      {
        path: PageNamesConstants.Tp2.path,
        name: PageNamesConstants.Tp2.name,
        component: Tp2,
      },
      {
        path: PageNamesConstants.Tp3.path,
        name: PageNamesConstants.Tp3.name,
        component: Tp3,
      },
    ];
    return routes;
  };
}
