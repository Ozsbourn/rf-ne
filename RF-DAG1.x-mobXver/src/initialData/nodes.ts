import { Node } from 'reactflow';



export default [
  {
    id: '10',
    type: 'custom',
    position: { x: 0, y: 0 },
  },
  {
    id: '12',
    type: 'custom',
    position: { x: 250, y: 320 },
  },

  {
    id: '1',
    type: 'C4Node',
    data: {
      mainLabel:   'Web-application Page',
      nodeType:    'Container',
      typeContent: 'React/Angular',
      description: 'This component describe some thing',
    
      PumlType: 'Container',
    },
    position: { x: 250, y: 250 },
  },

  {
    id: '2',
    type: 'C4Node',
    data: {
      mainLabel:   'Sign-In Controller',
      nodeType:    'Component',
      typeContent: 'Supabase auth',
      description: 'This component serve auth logic',

      PumlType: 'Component',
    },
    position: { x: 450, y: 350 },
  },
  {
    id: '3',
    type: 'C4Node',
    data: {
      mainLabel:   'E-mail system',
      nodeType:    'Component',
      typeContent: 'Software system',
      description: 'This external component send smth to th e-mail of users',
    
      PumlType: 'Component',
    },
    position: { x: 750, y: 355 },
  },
  {
    id: '4',
    type: 'C4Node',
    data: {
      mainLabel:   'Database for service logic',
      nodeType:    'Container',
      typeContent: 'Oracle DB',
      description: 'Stores any data of service',
    
      PumlType: 'Container',
    },
    position: { x: 630, y: 555 },
  },
] as Node[];