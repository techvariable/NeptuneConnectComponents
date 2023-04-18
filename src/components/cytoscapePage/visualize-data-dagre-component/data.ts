export default [
  {
    group: 'nodes',
    data: {
      id: '19ff0792-01c2-43f8-8b56-18a72679ebe5',
      globalName: 'c01342d3-1e59-47c9-aec9-d72f98bddeb5,IMS-1',
      displayName: 'IMS-1',
      localName: 'IMS-1',
      properties: {
        Status: 'DEPLOYED',
      },
      kind: 'NetworkService',
      operationalState: 'Working',
      alarmSeverity: 'cleared',
    },
    classes: 'nodeIcon',
  },
  {
    group: 'nodes',
    data: {
      id: 'f2592dbf-d288-491c-b1b7-23562119e53d',
      globalName: 'CBAM-4243fe12966546c0889e763bfa308c46,NTAS30',
      displayName: 'Abhishek',
      localName: 'Abhishek',
      properties: {},
      kind: 'VNF',
      usageState: null,
      lifecycleState: 'Operating',
      category: null,
      administrativeState: null,
      operationalState: 'Working',
      alarmSeverity: 'cleared',
    },
    classes: 'nodeIcon',
  },
  {
    data: {
      group: 'edges',
      source: '19ff0792-01c2-43f8-8b56-18a72679ebe5',
      target: 'f2592dbf-d288-491c-b1b7-23562119e53d',
    },
  },
];
