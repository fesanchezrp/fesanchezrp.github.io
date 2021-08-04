const menu = {
    'CONCI': {name: 'Conciliación', description: 'Garantiza la integridad de las transacciones', iconUrl: './img/menu-icons/handshake.svg', status: 0, action: '', isOnMainMenu: true},
    // 'REPCO':{name: 'Reportes', description: 'Ver los reportes del sistema', iconUrl: './img/menu-icons/report.svg', status: 1, action: 'reporter', isOnMainMenu: true},
    'CONTR': {name: 'Contracargos', description: 'Administra las disputas generadas', iconUrl: './img/menu-icons/chargeback.svg', status: 0,action: '', isOnMainMenu: true},
    'LIQUI':{name: 'Liquidación', description: 'Intercambio de valores / participaciones en valores', iconUrl: './img/menu-icons/money.svg', status: 1, action: {
        'LIQUIPRO': {name: 'Procesamiento', description: '', iconUrl: './img/menu-icons/mechanical-gears-primary.svg', status: 0, isCategory: true, action: {
            'ENT':{name: 'Gestión de Entidades', description: 'Gestione las entidades registradas en el sistema', iconUrl: './img/menu-icons/entities.svg', status: 0, action: 'entities'},
            'DIS':{name: 'Liquidación de Comercios', description: 'Realice pagos a los comercios gestionados', iconUrl: './img/menu-icons/commerce-disbursement.svg', status: 0, action: ''},
            'LIQ':{name: 'Generación de Pagos', description: 'Genere pagos, y administre su enturamiento', iconUrl: './img/menu-icons/payment-generation.svg', status: 0, action: ''},

        }},
        'LIQUICON': {name: 'Consultas y Reportes', description: '', iconUrl: './img/menu-icons/search.svg', status: 0, isCategory: true, action: {
            'CONCOB':{name: 'Consulta de Cobros', description: 'Consulte los cobros dentro del sistema', iconUrl: './img/menu-icons/collection-search.svg', status: 0, action: ''},
            'CONPA':{name: 'Consulta de Pagos', description: 'Consulte los pagos dentro del sistema', iconUrl: './img/menu-icons/payment-search.svg', status: 0, action: ''},
            'LIQCON':{name: 'Transacciones por Liquidar', description: 'Verifique las transacciones pendientes por liquidar', iconUrl: './img/menu-icons/disbursement-transactions.svg', status: 0, action: ''},

        }},
    }, isOnMainMenu: true},
    'RECL':{name: 'Reclamos', description: 'Gestiona los reclamos de conciliación, liquidación etc', iconUrl: './img/menu-icons/megaphone.svg', status: 0, action: '', isOnMainMenu: true},
    // 'TPRE':{name: 'Transacciones presentadas', description: 'Administra las transacciones presentadas', iconUrl: './img/menu-icons/dial.svg', status: 0, action: '', isOnMainMenu: true},
    'MANT':{name: 'Configuración', description: 'Realiza tareas administrativas técnicas', iconUrl: './img/menu-icons/wrench.svg', status: 0, action: {
            'UTIL': {name: 'Utilidades', description: 'Ejecuta tareas de mantenimiento en el sistema', iconUrl: './img/menu-icons/mechanical-gears-primary.svg', status: 0, action: {
                'PERS':{name: 'Personalizar aplicación', description: 'Cambia la identidad de la aplicacion', iconUrl: './img/menu-icons/brush.svg', status: 0, action: 'customize'},
                'EDIT':{name: 'Editor de ayudas', description: 'Ajusta la ayuda de usuario del sistema', iconUrl: './img/menu-icons/editor.svg', status: 0, action: 'edit'}
            }}
    }, isOnMainMenu: true},
    // 'PARA':{name: 'Parámetros Generales', description: 'Define el funcionamiento del sistema', iconUrl: './img/menu-icons/mechanical-gears.svg', status: 0, action: '', isOnMainMenu: true}
};