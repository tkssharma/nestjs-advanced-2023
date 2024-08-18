console.log(
  JSON.stringify({
    event_name: 'ADD_PURCHASER_USER_CONVERSATION',
    event_description: 'add purchaser user to teh conversations',
    external_id: '3ee1d285-8f69-40b2-a4d7-107c9844557d',
    payload: {
      rfx_id: '3ee1d285-8f69-40b2-a4d7-107c9844557d',
      purchaser_id: '0e65d09c-bd8b-4c56-85fc-2d04ff77cc0f',
      participants: [
        {
          user_id: 'af5f91e7-a2f5-4af2-b255-d2dfbc6c83e8',
          first_name: 'Wan Keng',
          last_name: 'Teh',
          email: 'wan-keng.teh@partners.basf.com',
          company_id: '0e65d09c-bd8b-4c56-85fc-2d04ff77cc0f',
          company_type: 'purchaser',
          company_info: {
            name: 'BASF Coatings',
            description:
              'Der Unternehmensbereich Coatings der BASF entwickelt, produziert und vermarktet ein hochwertiges Sortiment innovativer Fahrzeug- und Autoreparaturlacke sowie Bautenanstrichmittel. Im Jahr 2016 erwarb BASF Chemetall, einen weltweit führenden Anbieter angewandter Oberflächenbehandlungen von Metall-, Kunststoff- und Glassubstraten für zahlreiche Industrien und Märkte. Mit dieser Erweiterung wurde BASF ein noch umfassenderer Anbieter von Oberflächenlösungen.\n\nUnsere intelligenten Lösungen helfen unseren Kunden, im Markt zu glänzen. Wir sehen globale Markttrends voraus und ermitteln für uns und unsere Kunden Geschäftspotential, das die Zukunft verschiedener Branchen prägen wird. Unser Ziel ist es, höchste Ansprüche an Technik und Qualität ästhetisch und zugleich umweltbewusst zu erfüllen. Wir verbinden außergewöhnliches Design mit Funktionalität. Ob Forschung und Entwicklung, Produktion oder Service – auf unsere Leistung ist weltweit Verlass.',
            id: '0e65d09c-bd8b-4c56-85fc-2d04ff77cc0f',
            linkedin_url: null,
            website_url: 'https://www.basf-coatings.com/global/de.html',
            logo_url: null,
          },
        },
      ],
    },
    organization_id: '0e65d09c-bd8b-4c56-85fc-2d04ff77cc0f',
    metadata: {
      user: {
        user_id: '81419b83-fbc6-446e-9456-5dbb512962e6',
        organization_id: '0e65d09c-bd8b-4c56-85fc-2d04ff77cc0f',
        isRootUser: false,
        isPurchaserAdmin: true,
        roles: ['purchaser-admin'],
        email: 'support+basfcoatings@mercanis.com',
        isSupplierAdmin: false,
        auth0_organization_id: 'org_Gz8k9LjMQoYCNDtz',
        permissions: [
          'rfx.event_create',
          'rfx.revision_create',
          'company.view',
          'workspaces.view',
          'users.view',
          'workflows.view',
          'pricing_template.view',
          'pricing_template.edit',
        ],
      },
    },
    message_id: '0773a369-7799-4e0e-b8fe-20932f71dde2',
  }),
);
