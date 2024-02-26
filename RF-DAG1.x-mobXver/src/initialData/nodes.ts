import { Node } from 'reactflow';



export default [
  {
    id: '1',
    type: 'C4Node',
    data: {
      mainLabel:   'User',
      nodeType:    'Person',
      typeContent: 'React/Angular',
      description: 'User of some service, that described by this scheme',
    
      pumlType: 'Person',
    },
    position: { x: 250, y: 250 },
  },

  {
    id: '2',
    type: 'C4Node',
    data: {
      mainLabel:   'Auth system',
      nodeType:    'System',
      typeContent: 'Supabase auth',
      description: 'This system serve authorization logic',

      pumlType: 'System',
    },
    position: { x: 450, y: 350 },
  },
  {
    id: '3',
    type: 'C4Node',
    data: {
      mainLabel:   'E-mail system',
      nodeType:    'System',
      typeContent: 'Software system',
      description: 'This external component send smth to the e-mail of users',
    
      pumlType: 'System',
    },
    position: { x: 750, y: 355 },
  },
  {
    id: '4',
    type: 'C4Node',
    data: {
      mainLabel:   'Cache System',
      nodeType:    'System',
      typeContent: 'Oracle DB',
      description: 'Stores working cache that needed for service',
    
      pumlType: 'System',
    },
    position: { x: 630, y: 555 },
  },
] as Node[];