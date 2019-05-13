const selectTree = (req, res) => {
  // console.log(req.body);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: [
      {
        id123: 'company',
        label: 'Company 🏢',
        children: [
          {
            id123: 'team-1', label: 'Team 1 👥',
            children: [
              { id123: 'person-1-1', label: 'Person 1-1 👱', customLabel: 'Person A-gcx 👱' },
              { id123: 'person-1-2', label: 'Person 1-2 🧔' },
            ],
          },
          {
            id123: 'team-2', label: 'Team 2 👥',
            children: [
              { id123: 'person-2-1', label: 'Person 2-1 👳' },
              { id123: 'person-2-2', label: 'Person 2-2 👧' },
              { id123: 'person-2-3', label: 'Person 2-3 👧' },
            ],
          },
          {
            id123: 'team-3', label: 'Team 3 👥',
            children: [
              { id123: 'person-3-1', label: 'Person 3-1 👳' },
              { id123: 'person-3-2', label: 'Person 3-2 👧', isNew: true },
              { id123: 'person-3-3', label: 'Person 3-3 👧', isDisabled: true },
              {
                id123: 'person-3-4', label: 'Person 3-4 👧',
                children: [
                  { id123: 'person-3-4-1', label: 'Person 3-4-1 👳' },
                  { id123: 'person-3-4-2', label: 'Person 3-4-2 👧' },
                ],
              },
            ],
          },
          { id123: 'person-4', label: 'Person 4 👩', children: [] },
          {
            id123: 'person-5', label: 'Person 5 👳', isDefaultExpanded: true,
            children: [
              { id123: 'person-5-1', label: 'Person 5-1 👳' },
              { id123: 'person-5-2', label: 'Person 5-2 👧' },
            ],
          },
        ],
      }],
  });
};

module.exports = {
  'POST /form/select-tree/optionslist': selectTree,
};
