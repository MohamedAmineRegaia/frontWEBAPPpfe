import SvgColor from 'src/components/svg-color';

// Fonction pour obtenir l'icône SVG
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Fonction pour obtenir la configuration de navigation basée sur le rôle de l'utilisateur
const getNavConfig = (role) => {
  if (role === 'ADMIN') {
    return [
      {
        title: 'dashboard',
        path: '/dashboard',
        icon: icon('ic_analytics'),
      },
      {
        title: 'user',
        path: '/user',
        icon: icon('ic_user'),
      },
    ];
  } if (role === 'MANAGER') {
    return [
      {
        title: 'product',
        path: '/products',
        icon: icon('ic_cart'),
      },
      {
        title: 'blog',
        path: '/blog',
        icon: icon('ic_blog'),
      },
    ];
  } if (role === 'STAFF') {
    return [
      {
        title: 'StaffDetails',
        path: '/StaffDetailsViewPage',
        icon: icon('ic_cart'),
      },
      {
        title: 'blog',
        path: '/blog',
        icon: icon('ic_blog'),
      },
    ];
  } if (role === 'COMMERCIAL') {
    return [
      {
        title: 'dashboard',
        path: '/dashboard',
        icon: icon('ic_analytics'),
      },
      {
        title: 'propales',
        path: '/PropalePage',
        icon: icon('ic_user'),
      },
      {
        title: 'Historique',
        path: '/HistoriqueList',
        icon: icon('ic_analytics'),
      },
    ];
  }

  return [];
};

export default getNavConfig;
