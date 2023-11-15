type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  trash: boolean;
};

export let notes: Note[] = [
  {
    id: "1",
    title: "Note 1",
    content: "This is the content of note 1",
    date: "2021-01-01",
    tags: ["tag1", "tag2"],
    trash: false,
  },
  {
    id: "2",
    title: "Note 2",
    content:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    date: "2021-01-02",
    tags: ["tag1", "tag3"],
    trash: false,
  },
  {
    id: "3",
    title: "Note 3",
    content: `
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    `,
    date: "2021-01-03",
    tags: ["tag2", "tag3"],
    trash: false,
  },
  {
    id: "4",
    title: "Note 4",
    content: "This is the content of note 4",
    date: "2021-01-04",
    tags: ["tag1", "tag2"],
    trash: true,
  },
];

export let tags: string[] = ["tag1", "tag2", "tag3"];
