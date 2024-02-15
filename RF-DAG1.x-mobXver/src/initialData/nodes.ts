import { Node } from 'reactflow';



export default [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Default' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'C4Node',
    data: {
      mainLabel:   'Web-application Page',
      nodeType:    'Container',
      typeContent: 'React/Angular',
      description: 'This component describe some thing',
    },
    position: { x: 250, y: 250 },
  },

  {
    id: '5',
    type: 'C4Node',
    data: {
      mainLabel:   'Sign-In Controller',
      nodeType:    'Component',
      typeContent: 'Supabase auth',
      description: 'This component serve auth logic',
    },
    position: { x: 450, y: 350 },
  },
  {
    id: '6',
    type: 'C4Node',
    data: {
      mainLabel:   'E-mail system',
      nodeType:    'Component',
      typeContent: 'Software system',
      description: 'This external component send smth to th e-mail of users',
    },
    position: { x: 750, y: 355 },
  },
  {
    id: '7',
    type: 'C4Node',
    data: {
      mainLabel:   'Database for service logic',
      nodeType:    'Container',
      typeContent: 'Oracle DB',
      description: 'Stores any data of service',
    },
    position: { x: 630, y: 555 },
  },
] as Node[];