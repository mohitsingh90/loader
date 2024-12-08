
// This list of professors 
export const PROFESSORS = [
  {
    id: 1,
    name: 'Professor Dumbledore',
    role: 'Headmaster',
    isPresent: true,
    avatar: 'avatar-Albus-Dumbledore',
  },
  {
    id: 2,
    name: 'Minerva McGonagall',
    role: 'Headmistress',
    isPresent: true,
    avatar: 'avatar-Minerva-McGonagall',
  },
  {
    id: 3,
    name: 'Horace Slughorn',
    role: 'Professor',
    subject: 'Potions Master',
    isPresent: true,
    avatar: 'avatar-Horace-Slughorn',
  },
  {
    id: 4,
    name: 'Severus Snape',
    role: 'Professor',
    subject: 'Potions Master',
    isPresent: true,
    avatar: 'avatar-Severus-Snape',
  },
  {
    id: 5,
    name: 'Rubeus Hagrid',
    role: 'Standby Professor',
    subject: 'Potions Master',
    isPresent: true,
    avatar: 'avatar-Rubeus-Hagrid',
  },
  {
    id: 6,
    name: 'Remus Lupin',
    role: 'Professor',
    subject: 'Defense Against the Dark Arts',
    isPresent : true
  },
  {
    id: 7,
    name: 'Gilderoy Lockhart',
    role: 'Professor',
    subject: 'Defense Against the Dark Arts',
    isPresent : true
  },
  {
    id: 8,
    name: 'Alastor Moody',
    role: 'Standby Professor',
    subject: 'Defense Against the Dark Arts',
    isPresent : true
  }
];

export const getProfessorName = (id) =>
  PROFESSORS.find((item) => item.id === id)?.name || '';
