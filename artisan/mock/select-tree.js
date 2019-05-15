const selectTree = (req, res) => {
  // console.log(req.body);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: [
      {
        id: 'company',
        label: 'Company 🏢',
        children: [
          {
            id: 'team-1', label: 'Team 1 👥',
            children: [
              { id: 'person-1-1', label: 'Person 1-1 👱', customLabel: 'Person A-gcx 👱' },
              { id: 'person-1-2', label: 'Person 1-2 🧔' },
            ],
          },
          {
            id: 'team-2', label: 'Team 2 👥',
            children: [
              { id: 'person-2-1', label: 'Person 2-1 👳' },
              { id: 'person-2-2', label: 'Person 2-2 👧' },
              { id: 'person-2-3', label: 'Person 2-3 👧' },
            ],
          },
          {
            id: 'team-3', label: 'Team 3 👥',
            children: [
              { id: 'person-3-1', label: 'Person 3-1 👳' },
              { id: 'person-3-2', label: 'Person 3-2 👧', isNew: true },
              { id: 'person-3-3', label: 'Person 3-3 👧', isDisabled: true },
              {
                id: 'person-3-4', label: 'Person 3-4 👧',
                children: [
                  { id: 'person-3-4-1', label: 'Person 3-4-1 👳' },
                  { id: 'person-3-4-2', label: 'Person 3-4-2 👧' },
                ],
              },
            ],
          },
          {
            id: 'person-4', label: 'Person 4 👳', isDefaultExpanded: true,
            children: [
              { id: 'person-4-1', label: 'Person 4-1 👳' },
              { id: 'person-4-2', label: 'Person 4-2 👧' },
            ],
          },
          { id: 'person-5', label: 'Person 5 👩', children: null },
          { id: 'person-6', label: 'Person 6 👳', children: null },
        ],
      }],
  });
};

module.exports = {
  'POST /form/select-tree/optionslist': selectTree,
};
