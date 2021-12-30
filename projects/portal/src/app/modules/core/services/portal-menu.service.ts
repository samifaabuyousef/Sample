import * as objectPath from 'object-path';
import {Injectable} from '@angular/core';
import {MenuConfigService} from 'nabed-components';
import {MenuConfig} from 'nabed-components';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PortalMenuService {
  modulesConfig = {
    header: {
      self: {},
      items: [{}]
    },
    aside: {
      items: [
        {
          key: 'Content Management',
          appear: true,
          title: 'Content Management',
          page: '/cms',
          icon: '/assets/images/icons/content-management-systems.svg',
        },
        {
          key: 'Content Management',
          appear: true,
          title: 'Channel Management',
          page: '/channel',
          icon: '/assets/images/icons/channel.svg',
        },
        {
          key: 'Content Management',
          appear: true,
          title: 'Ticker Management',
          page: '/tkm',
          icon: '/assets/images/icons/rss.svg',
        },



        // {
        //   key: 'Deployment Managment',
        //   appear: true,
        //   title: 'Deployment Management',
        //   page: '/dms',
        //   icon: '/assets/images/icons/deployment.svg',
        // },


        {
          key: 'POC Administration',
          appear: true,
          title: 'POC Management ',
          page: '/poc',
          icon: '/assets/images/icons/hospital.svg',
        },
        // {
        //   key: 'POC Administration',
        //   appear: true,
        //   title: 'Admin Poc Management ',
        //   page: '/adm',
        //   icon: '/assets/images/icons/hospital.svg',
        // },
        {
          key: 'User Managements',
          appear: true,
          title: 'Users Management ',
          page: '/ums',
          icon: '/assets/images/icons/userManagement.svg',
        },

        {
          key: 'Poc user Managements',
          appear: true,
          title: 'Users Management ',
          page: '/dums',
          icon: '/assets/images/icons/userManagement.svg',
        },

        {
          key: 'Poc user Managements',
          appear: true,
          title: 'License Management',
          page: '/plm',
          icon: '/assets/images/icons/userManagement.svg',
        },

        {
          key: 'Poc user Managements',
          appear: true,
          title: 'Content Management ',
          page: '/pcm',
          icon: '/assets/images/icons/userManagement.svg',
        },
        {
          key: 'Poc user Managements',
          appear: true,
          title: 'Ticker Management',
          page: '/pfm',
          icon: '/assets/images/icons/rss.svg',
        },
        {
          key: 'Poc user Managements',
          appear: true,
          title: 'Devices Monitoring ',
          page: '/pdm',
          icon: '/assets/images/icons/userManagement.svg',
        },
        // {
        //   key: 'Poc user Managements',
        //   appear: true,
        //   title: 'Connect ',
        //   page: '/cdm',
        //   icon: '/assets/images/icons/userManagement.svg',
        // },

        {
          key: 'Campaign analytics',
          appear: true,
          title: 'Campaigns Analytics',
          page: '/cmp',
          icon: '/assets/images/icons/userManagement.svg',
        },

        {
          key: 'POC Administration',
          appear: true,
          title: 'Campaign Management',
          page: '/camps',
          icon: '/assets/images/icons/advertisement.svg',
        },


        // cmp: {
        //   title: 'Campaign Analytics',
        /*  {
            product_id: 9340,
            title: 'Prescribe',
            page: '/prescribe',
            icon: '/assets/images/icons/hcp-clipboard-with-pencil.svg',
          }, */
        /* {
           product_id: 8991,
           title: 'Interactive Tablet',
           page: '/it',
           icon: '/assets/images/icons/hcp-tablet-icon.svg',
         }, */
        /*  {
            product_id: 10649,
            title: 'Nabed TV',
            page: '/tv',
            icon: '/assets/images/icons/hcp-monitor-icon.svg',
          }, */
        /* {

           title: 'Financials',
           page: '/financial',
           icon: '/assets/images/icons/hcp-five-coins-stack.svg',
         }, */

        /* {
           title: 'Devices Monitoring',
           page: '/devices',
           icon: '/assets/images/icons/hcp-monitor-settings.svg',
         }, */
        /*  {
            title: 'Users Management',
            page: '/users',
            icon: '/assets/images/icons/hcp-user-settings.svg',
          }, */
      ]
    },
    product: {
      name: 'Nabed Platform © 2020',
      version: 'Nabed v.1.1'
    }
  };
  pagesConfig = {
    /*  prescribe: {
        items: [
          {
            title: 'Dashboard',
            page: '/prescribe/dashboard',
          },
          {
            title: 'Patients',
            page: '/prescribe/patients',
          },
          {
            title: 'Campaigns',
            page: '/prescribe/campaigns'
          },
          {
            title: 'Settings',
            page: '/prescribe/settings'
          }
        ]
      }, */
    /*  financial: {
        items: [
          {
            title: 'Financial',
            page: '/financial/sponsorship',
            items: [
              {
                title: 'Add sponsorship',
                page: '/financial/sponsorship/add',
              },
            ]
          },
          {
            title: 'Sponsors',
            page: '/financial/sponsors'
          },
          {
            title: 'Advertisement',
            page: '/financial/advertisement'
          }
        ]
      }, */


      tkm:{
        title: 'Ticker Management',
        items: [
          {
            title: 'Feed',
            page: '/tkm/feed',

          },


          {
            title: 'Sources',
            page: '/tkm/source',
            items: [
              {
                title: 'Edit Source',
                page: '/tkm/source/edit/type/id',
                itemsNotInheader: 'true'
              },
              {
                title: 'Add Source',
                page: '/tkm/source/new/id',
                itemsNotInheader: 'true'
              }
            ]

          },
          {
            title: 'Tickers',
            page: '/tkm/ticker',
            items: [
              {
                title: 'Edit Ticker',
                page: '/tkm/ticker/edit/id',
                itemsNotInheader: 'true'
              },
              {
                title: 'Add Ticker',
                page: '/tkm/ticker/new',
                itemsNotInheader: 'true'
              }
            ]

          }
,
          {
            title: 'Association',
            page: '/tkm/association',

          },


        ]

      },
    channel: {
      title: 'Channel Management',
      items: [
        {
          title: 'Channels',
          page: '/channel',
          items: [
            {
              title: 'TV Channels',
              page: '/channel/tv',
              itemsNotInheader: 'true',
              items: [
                {
                  title: 'Add TV Channel',
                  page: '/channel/tv/new',
                  itemsNotInheader: 'true'

                },
                {
                  title: 'Edit TV Channel',
                  page: '/channel/tv/edit/id',
                  itemsNotInheader: 'true'

                }
              ]
            },
            {
              title: 'Connect Channels',
              itemsNotInheader: 'true',
              page: '/channel/connect',
              items: [
                {
                  title: 'Add Connect Channel',
                  page: '/channel/connect/new',
                  itemsNotInheader: 'true'

                },
                {
                  title: 'Edit Connect Channel',
                  page: '/channel/connect/edit/id',
                  itemsNotInheader: 'true'

                }
              ]
            }
          ]
        }

      ]
    },
    cms: {
      title: 'Content Management',
      items: [
        {
          title: 'Dashboard',
          page: '/cms/dashboard',
        },
        {
          title: 'Structure',
          page: '/cms/structure',
          toggle: 'hover',
          click: 'Structure();$event.preventDefault();$event.stopPropagation()',
          items: [
            {
              title: 'Specialties',
              page: '/cms/structure/specialities',
              items: [
                {
                  title: 'Add speciality',
                  page: '/cms/structure/specialities/new',

                },
                {
                  title: 'Edit speciality',
                  page: '/cms/structure/specialities/edit/id',
                },
              ]
            },

            {
              title: 'Conditions',
              page: '/cms/structure/conditions',
              items: [
                {
                  title: 'Add condition',
                  page: '/cms/structure/conditions/new'
                },
                {
                  title: 'Edit condition',
                  page: '/cms/structure/conditions/edit/id'
                }
              ]
            },
            {
              title: 'Procedures',
              page: '/cms/structure/procedures',
              items: [
                {
                  title: 'Add procedure',
                  page: '/cms/structure/procedures/new'
                },
                {
                  title: 'Edit procedure',
                  page: '/cms/structure/procedures/edit/id'
                }
              ]
            },
            {
              title: 'Curated Categories',
              page: '/cms/structure/curated',
              items: [
                {
                  title: 'Add curated category',
                  page: '/cms/structure/curated/new'
                },

                {
                  title: 'Edit curated category',
                  page: '/cms/structure/curated/edit/id'
                }
              ]
            },
            {
              title: 'Topics',
              page: '/cms/structure/topics',
              items: [
                {
                  title: 'Add topic',
                  page: '/cms/structure/topics/new'
                },
                {
                  title: 'Edit topic',
                  page: '/cms/structure/topics/edit/id'
                }

              ]
            },

          ]
        },
        {
          title: 'Content',
          page: '/cms/content',
          items: [
            {
              title: 'Add Content',
              page: '/cms/content/article/new',

              itemsNotInheader: 'true'
            },
            {
              title: 'Edit Content',
              page: '/cms/content/article/edit/id',
              itemsNotInheader: 'true'
            },

            {
              title: 'Add Content',
              page: '/cms/content/video/new',

              itemsNotInheader: 'true'
            },
            {
              title: 'Edit Content',
              page: '/cms/content/video/edit/id',
              itemsNotInheader: 'true'
            },

            {
              title: 'Add Content',
              page: '/cms/content/tip/new',

              itemsNotInheader: 'true'
            },
            {
              title: 'Edit Content',
              page: '/cms/content/tip/edit/id',
              itemsNotInheader: 'true'
            },

            {
              title: 'Add Content',
              page: '/cms/content/module/new',

              itemsNotInheader: 'true'
            },
            {
              title: 'Edit Content',
              page: '/cms/content/module/edit/id',
              itemsNotInheader: 'true'
            }
          ]
        },
        {
          title: 'Tags',
          page: '/cms/tags',
        },
        {
          title: 'Translation',
          page: '/cms/translation',
          items: [{
            title: '',
            page: '',
            items: [
              {
                title: 'Translate to Arabic',
                page: '/cms/translation/translate/ar-AR'
              },
              {
                title: 'Translate to English',
                page: '/cms/translation/translate/en-US'
              }
            ]
          }]
        }
      ]
    },


    // dms: {
    //   title: '',
    //
    //   items: [
    //     {
    //       title: 'Dashboard',
    //       page: '/dms/dashboard',
    //     },
    //     {
    //       title: 'Nodes',
    //       page: '/dms/nodes',
    //
    //
    //       items: [
    //
    //         {
    //           title: 'POC Type',
    //           page: '/dms/nodes/poc%20type',
    //           itemsNotInheader: 'true'
    //         },
    //         {
    //           title: 'Ward',
    //           page: '/dms/nodes/ward',
    //           itemsNotInheader: 'true'
    //         },
    //         {
    //           title: 'Room',
    //           page: '/dms/nodes/room',
    //           itemsNotInheader: 'true'
    //         },
    //         {
    //           title: 'Outlet',
    //           page: '/dms/nodes/outlet',
    //           itemsNotInheader: 'true'
    //         },
    //         {
    //           title: 'Add Node',
    //           page: '/dms/nodes/new/type',
    //           pageWithOutVariable: '/dms/nodes/new',
    //           itemsNotInheader: 'true'
    //         },
    //
    //
    //         {
    //           title: 'Edit Node',
    //           page: '/dms/nodes/edit/id',
    //           itemsNotInheader: 'true'
    //         }
    //       ]
    //
    //     },
    //   ]
    // },
    poc: {
      title: 'POC Administration',
      items: [
        {
          title: 'Dashboard',
          page: '/poc/dashboard',
        },
        {
          title: 'POCs',
          titleInBreadCrumb: 'POC Managment',
          page: '/poc/poc',
          items: [
            {
              title: 'Edit POC',
              page: '/poc/poc/editPoc/id',
              itemsNotInheader: 'true'
            },
            {
              title: 'Add POC',
              page: '/poc/poc/new',
              itemsNotInheader: 'true'
            }
          ]
        },
        {
          title: 'POC Users',
          titleInBreadCrumb: 'POC Users',
          page: '/poc/users',
          items: [
            {
              title: 'Edit POC User',
              page: '/poc/users/edit/id',
              itemsNotInheader: 'true'
            },
            {
              title: 'Add POC User',
              page: '/poc/users/new',
              itemsNotInheader: 'true'
            }
          ]
        },
        {
          title: 'Devices',
          titleInBreadCrumb: 'Devices',
          page: '/poc/devices',
          items: [
            {
              title: 'Edit POC Device',
              page: '/poc/devices/edit/id',
              itemsNotInheader: 'true'
            }
          ]
        }
      ]
    },

    // adm: {
    // title: 'POC Administration',
    // items: [
    //   {
    //     title: 'Poc',
    //     page: '/adm/poc',
    //     items: [
    //       {
    //         title: 'Edit Poc',
    //         page: '/adm/poc/edit/id',
    //         itemsNotInheader: 'true'
    //       },
    //       {
    //         title: 'Add Poc',
    //         page: '/adm/poc/create',
    //         itemsNotInheader: 'true'
    //       }
    //     ]

    //   },

    //   {
    //     title: 'Poc Users',
    //     titleInBreadCrumb: 'Poc Users',
    //     page: '/adm/users',
    //     items: [
    //       {
    //         title: 'Edit Poc User',
    //         page: '/adm/users/edit/id',
    //         itemsNotInheader: 'true'
    //       }
    //     ]
    //   },
    //   {
    //     title: 'Devices',
    //     titleInBreadCrumb: 'Devices',
    //     page: '/adm/devices',
    //     items: [
    //       {
    //         title: 'Edit Poc Device',
    //         page: '/adm/devices/edit/id',
    //         itemsNotInheader: 'true'
    //       }
    //     ]
    //   }
    // ]
    // },
    ums: {
      title: 'User Management',
      items: [

        {
          title: 'Users',
          titleInBreadCrumb: 'POC Managment',
          page: '/ums/users',
          items: [


            {
              title: 'Add User',
              page: '/ums/users/new',
              itemsNotInheader: 'true'
            },


            {
              title: 'Edit User',
              page: '/ums/users/edit/id',
              itemsNotInheader: 'true'
            }
          ]

        },
      ]
    },
    dums: {
      title: 'Users Management',
      items: [

        {
          title: 'Analytics',
          titleInBreadCrumb: 'POC Managment',
          page: '/dums/analytic',


        },
        {
          title: 'Users',
          titleInBreadCrumb: 'POC Managment',
          page: '/dums/users',
          items: [


            {
              title: 'Add User',
              page: '/dums/users/new',
              itemsNotInheader: 'true'
            }, {
              title: 'Edit User',
              page: '/dums/users/edit/id',
              itemsNotInheader: 'true'
            }
          ]

        }



      ]
    },

    plm:{
      title: 'License Management',

            items: [

              {
                title: 'Licenes',
                titleInBreadCrumb: 'Devices Monitoring',
                page: '/plm'
              }]
    },
    pfm:{
      title: 'Ticker Management',

            items: [

              {
                title: 'Feed',
                titleInBreadCrumb: 'Devices Monitoring',
                page: '/pfm'
              }]
    },
    pcm:
      {
        title: 'Content Management',
        items: [

          {
            title: 'Analytics',
            titleInBreadCrumb: 'Devices Monitoring',
            page: '/pcm/analytic'
          },

          {
            title: 'Educational Library',
            alternativeBreadCrumb: '',
            titleInBreadCrumb: 'Devices Monitoring',
            page: '/pcm/contentManagement',
            item: [
              {
                title: 'Condition',
                page: '/pcm/contentManagement/speciality/id/condition/id',
                variable: [{id: 'condition', title: 'condition'}],
                itemsNotInheader: 'true',
                item: [
                  {
                    title: 'topic',
                    page: '/pcm/contentManagement/speciality/id/condition/id/topic/id_id',

                    itemsNotInheader: 'true'
                  }
                ]

              },
              {
                title: 'Curated',
                page: '/pcm/contentManagement/speciality/id/curated/id',

                itemsNotInheader: 'true',
                item: [
                  {
                    title: 'topic',
                    page: '/pcm/contentManagement/speciality/id/curated/id/topic/id_id',

                    itemsNotInheader: 'true'
                  }
                ]

              },
              {
                title: 'Procedure',
                page: '/pcm/contentManagement/speciality/id/procedure/id',

                itemsNotInheader: 'true',
                item: [
                  {
                    title: 'topic',
                    page: '/pcm/contentManagement/speciality/id/procedure/id/topic/id_id',

                    itemsNotInheader: 'true'
                  }
                ]

              }
            ]


          },

          {
            title: 'My Videos',
            titleInBreadCrumb: 'Devices Monitoring',
            page: '/pcm/my-videos'
          }
        ]
      },
    pdm: {
      title: 'Devices Monitoring',
      items: [

        {
          title: 'Devices',
          titleInBreadCrumb: 'Devices Monitoring',
          page: '/pdm',


        },
      ]
    },
    // hcp: {
    //   title: 'Analytics',
    //   items: [

    //     {
    //       title: 'User Analytics',
    //       titleInBreadCrumb: 'HCPP11',
    //       page: '/hcp',


    //     },
    //   ]
    // },
    cdm: {
      title: 'Connect Deployment Management',
      items: [

        {
          title: 'Poc Deployment Tree',
          titleInBreadCrumb: 'POC Managment',
          page: '/cdm',


        },
      ]
    },
    cmp: {
      title: 'Campaigns Analytics',
      items: [

        // {
        //   title: 'Brands',
        //   titleInBreadCrumb: 'POC Management',
        //   page: '/cmp/brands',
        //   items: [


        //     {
        //       title: 'Brand Summary',
        //       page: '/cmp/brands/view/id',
        //       itemsNotInheader: 'true'
        //     },

        //     {
        //       title: 'Campaines',
        //       titleInBreadCrumb: 'POC Management',
        //       page: '/cmp/brands/id/campaigns',
        //       itemsNotInheader: 'true',
        //       items: [


        //         {
        //           title: 'View campmaign',
        //           page: '/cmp/brands/id/campaigns/view/id',
        //           itemsNotInheader: 'true'
        //         },

        //         {
        //           title: 'Ads',
        //           titleInBreadCrumb: 'POC Management',
        //           page: '/cmp/brands/id/campaigns/id/ads',

        //           itemsNotInheader: 'true',
        //           items: [


        //             {
        //               title: 'View ads',
        //               page: '/cmp/brands/id/campaigns/id/ads/view/id',
        //               itemsNotInheader: 'true'
        //             },
        //             {
        //               title: 'idle',
        //               page: '/cmp/brands/id/campaigns/id/ads/idle',
        //               itemsNotInheader: 'true'
        //             },

        //             {
        //               title: 'pharma_content',
        //               page: '/cmp/brands/id/campaigns/id/ads/pharma_content',
        //               itemsNotInheader: 'true'
        //             },
        //             {
        //               title: 'pharma_category',
        //               page: '/cmp/brands/id/campaigns/id/ads/pharma_category',
        //               itemsNotInheader: 'true'
        //             },

        //             {
        //               title: 'pharma',
        //               page: '/cmp/brands/id/campaigns/id/ads/pharma',
        //               itemsNotInheader: 'true'
        //             },

        //           ]

        //         }

        //       ]

        //     },

        //   ]

        // },
        {
          title: 'Campaigns',
          titleInBreadCrumb: 'POC Managment',
          page: '/cmp/campaigns',
          item: [
            {
              title: 'Campaign Summary',
              page: '/cmp/campaigns/view/id',
              itemsNotInheader: 'true',
              item: [
                {
                  title: 'Ad Statistics',
                  page: '/cmp/campaigns/view/id/adsView/id',

                  itemsNotInheader: 'true'
                }
              ]
            }
          ]
        }
        ,
        {
          title: 'Ads',
          titleInBreadCrumb: 'POC Managment',
          page: '/cmp/ads',
          item: [
            {
              title: 'Ad Statistics',
              page: '/cmp/ads/view/id',
              itemsNotInheader: 'true'
            }
          ]
        }

      ]
    },
    camps: {
      title: 'Campaign Management',
      items: [
        {
          title: 'Advertisers',
          titleInBreadCrumb: 'Advertisers',
          page: '/camps/advertisers',
          item: [
            {
              title: 'Advertisers List',
              page: '/camps/advertisers',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'Edit Advertiser',
              page: '/camps/advertisers/edit/id',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'New Advertiser',
              page: '/camps/advertisers/new',
              itemsNotInheader: 'true',
              item: []
            }
          ]
        },
        {
          title: 'Brands',
          titleInBreadCrumb: 'Brands',
          page: '/camps/brands',
          item: [
            {
              title: 'Brands List',
              page: '/camps/brands',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'Edit Brand',
              page: '/camps/brands/edit/id',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'New Brand',
              page: '/camps/brands/new',
              itemsNotInheader: 'true',
              item: []
            }
          ]
        },
        {
          title: 'Campaigns',
          titleInBreadCrumb: 'Campaigns',
          page: '/camps/campaigns',
          item: [
            {
              title: 'Campaigns List',
              page: '/camps/campaigns',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'Edit Campaigns',
              page: '/camps/campaigns/edit/id',
              itemsNotInheader: 'true',
              item: [
                {
                  title: 'Networks',
                  page: '/camps/campaigns/edit/id/networks',
                  itemsNotInheader: 'true',
                },
                {
                  title: 'Add Networks',
                  page: '/camps/campaigns/edit/id/networks/new',
                  itemsNotInheader: 'true',
                },
                {
                  title: 'Edit Networks',
                  page: '/camps/campaigns/edit/id/networks/edit/neworkId',
                  itemsNotInheader: 'true',
                },
              ]
            },
            {
              title: 'New Campaigns',
              page: '/camps/campaigns/new',
              itemsNotInheader: 'true',
              item: []
            }
          ]
        },
        {
          title: 'Ads',
          titleInBreadCrumb: 'Ads',
          page: '/camps/ads',
          item: [
            {
              title: 'Ads List',
              page: '/camps/ads',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'Edit Ad',
              page: '/camps/ads/edit/id',
              itemsNotInheader: 'true',
              item: []
            },
            {
              title: 'New Ad',
              page: '/camps/ads/new',
              itemsNotInheader: 'true',
              item: []
            }
          ]
        }
      ]
    }
  };

  routAfterLogIn: string;
  changingRouterLink = new Subject<string>();

  constructor(private menuConfig: MenuConfigService, private router: Router,
              public authService: AuthenticationService) {


  }

  getVisiblePage(permissions: string[]) {
    if (permissions && permissions.length > 0) {
      this.modulesConfig.aside.items.forEach(element => {
        element.appear = permissions.findIndex(x => x === element.key) !== -1 ? true : false;

      });
    }

  }

  getPerssionOnHeader() {
    this.authService.getUserProfile().subscribe(
      (data) => {
        if (data.roles.length > 0) {
          localStorage.setItem('roles', JSON.stringify(data.roles));
        }
        if (data.permissions.length > 0) {
          localStorage.setItem('permission', JSON.stringify(data.permissions));
          localStorage.setItem('user_id', data.id);
          this.getVisiblePage(data.permissions);
          this.getTheFirstPageLink(data.permissions[0]);
          const pocUserManagements = data.permissions.find(x => x === 'Poc user Managements');

          if (pocUserManagements) {
            localStorage.setItem('adminPocId', data.id)
          }
        }
        const userFullName = objectPath.coalesce(data, ['full_name', 'first_name']);
        if (userFullName) {
          localStorage.setItem('user_full_name', userFullName);

        }
        const userImage = objectPath.coalesce(data, ['media']);
        if (userImage) {

          localStorage.setItem('user_image', userImage.url);
        }
        // else{
        //     localStorage.setItem('permission', '["Poc user Managements"]');
        //     this.getVisiblePage(["Poc user Managements"]);
        //   this.getTheFirstPageLink("Poc user Managements");
        //   }


      },
      (error) => {

      }
    );
  }

  getTheFirstPageLink(link) {
    this.routAfterLogIn = this.modulesConfig.aside.items.find(x => x.key === link).page;
    this.changingRouterLink.next(this.routAfterLogIn);
  }

  public init() {
    this.menuConfig.setModel(new MenuConfig(this.modulesConfig));
  }

  public setHeaders(page) {
    objectPath.set(this.modulesConfig, 'header.items', objectPath.get(this.pagesConfig, `${page}.items`));
    objectPath.set(this.modulesConfig, 'header.breadCrumb', objectPath.get(this.pagesConfig, `${page}`));

  }

  public setVariableInBreadCrumb(newRoter, subRouter?) {
    // string.includes(substring)
    const menus = objectPath.get(this.modulesConfig, 'header.breadCrumb');
    if (!menus) {
      return [];
    }
    const regEx = /\d+$/;
    const regEx2 = /\d+/;
    let route = typeof (subRouter) != 'undefined' && typeof (subRouter) !== 'undefined' ? subRouter : this.router.url;

    const breadcrumbs = [];
    if (regEx.test(this.router.url)) {
      route = typeof (subRouter) != 'undefined' && typeof (subRouter) !== 'undefined' ?
        subRouter.replace(regEx, 'id') : this.router.url.replace(regEx, 'id');


    }
    while (regEx.test(route) || regEx2.test(route)) {
      if (regEx.test(route)) {
        route = route.replace(regEx, 'id');
      } else if (regEx2.test(route)) {

        route = route.replace(regEx2, 'id');

      }
    }

    const menuPath = this.getPath(menus, route, newRoter);

  }

  getPath(obj, value, newRoter = '') {
    if (typeof obj !== 'object') {
      throw new TypeError('Can only operate on Array or Object');
    }
    const path = [];
    let found = false;

    function search(haystack) {

      for (const key in haystack) {
        path.push(key);
        if (haystack[key] === value || value.includes(haystack['pageWithOutVariable'])) {
          haystack['alternativeBreadCrumb'] = newRoter;
          found = true;
          break;
        }
        if (typeof haystack[key] === 'object') {

          search(haystack[key]);
          if (found) {
            break;
          }
        }
        path.pop();
      }
    }

    search(obj);
    return path;
  }
}


// {
// 	"grant_type":"password",
// 	"client_id":1,
// 	"client_secret":"CYz98MWuHRveOc1ErPkklLqrAQCqoePRLxTmOew1",
// 	"username":"admin@nabed.net",
// 	"password":"2020.Nn@BbEeDd"
// }
