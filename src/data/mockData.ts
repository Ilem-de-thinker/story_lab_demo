import { Author, Story, Comment, Draft, Notification, Conversation, Topic, WriterStatus } from '../types';

export const CURRENT_USER: Author = {
  id: 'user-current',
  name: 'Elena Rostova',
  username: 'erostova',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  bio: 'Essayist & novelist exploring silence, memory, and the craft of deliberate living. Fellow at the Horizon Literary Guild.',
  location: 'Edinburgh & Nairobi',
  website: 'https://elenarostova.ink',
  joinedDate: 'May 2024',
  followersCount: 2480,
  followingCount: 142,
  publishedCount: 18,
};

export const MOCK_AUTHORS: Author[] = [
  CURRENT_USER,
  {
    id: 'author-kwame',
    name: 'Kwame Mensah',
    username: 'kwamemensah',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Software architect, essayist, and founder exploring African technology ecosystems, digital commons, and systems philosophy.',
    location: 'Accra, Ghana',
    website: 'https://kwamemensah.dev',
    joinedDate: 'January 2024',
    followersCount: 8940,
    followingCount: 310,
    publishedCount: 29,
    featured: true,
  },
  {
    id: 'author-clara',
    name: 'Clara Lindqvist',
    username: 'claralind',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Poet and biographer. Author of "The Geometry of Winter Solitude". Curator of vintage letterpress arts.',
    location: 'Stockholm, Sweden',
    website: 'https://claralindqvist.se',
    joinedDate: 'March 2024',
    followersCount: 6120,
    followingCount: 215,
    publishedCount: 34,
    featured: true,
  },
  {
    id: 'author-marcus',
    name: 'Marcus Vance',
    username: 'marcusvance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Senior compiler engineer and essayist. Investigating why prose remains the greatest tool for debugging human thought.',
    location: 'Oxford, UK',
    website: 'https://vanceoncode.org',
    joinedDate: 'February 2024',
    followersCount: 5200,
    followingCount: 180,
    publishedCount: 14,
    featured: true,
  },
  {
    id: 'author-amara',
    name: 'Amara Diallo',
    username: 'amaradiallo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Literary critic and short story writer. Writing at the crossroads of West African folklore, migration, and contemporary fiction.',
    location: 'Dakar & Paris',
    website: 'https://amaradiallo.com',
    joinedDate: 'April 2024',
    followersCount: 4320,
    followingCount: 198,
    publishedCount: 22,
  },
  {
    id: 'author-julian',
    name: 'Julian Chen',
    username: 'julianchen',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Philosopher of technology and typography enthusiast. Researching slow computing and deep reading retention.',
    location: 'Vancouver, BC',
    website: 'https://julianchen.ca',
    joinedDate: 'June 2024',
    followersCount: 3890,
    followingCount: 140,
    publishedCount: 19,
  },
  {
    id: 'author-sylvia',
    name: 'Sylvia Oakhaven',
    username: 'sylviawrites',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Nature essayist and letter-writer. Chronicling forest stewardship, avian rhythms, and quiet domestic rituals.',
    location: 'Vermont, USA',
    website: 'https://oakhavenletters.net',
    joinedDate: 'September 2024',
    followersCount: 2950,
    followingCount: 110,
    publishedCount: 16,
  },
  {
    id: 'author-tariq',
    name: 'Tariq Al-Mansoor',
    username: 'tariqmansoor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Translator and poet. Turning classical Arabic verse into contemporary English stanzas. Contributor to Granta and Poetry London.',
    location: 'Beirut, Lebanon',
    website: 'https://tariqmansoor.me',
    joinedDate: 'July 2024',
    followersCount: 3410,
    followingCount: 95,
    publishedCount: 12,
  },
];

export const MOCK_STORIES: Story[] = [
  {
    id: 'story-african-tech',
    slug: 'the-future-we-can-build-with-african-technology',
    title: 'The Future We Can Build with African Technology',
    subtitle: 'Beyond Silicon Valley templates: how local infrastructure, distributed power, and communal knowledge are redefining innovation.',
    excerpt: 'When innovation begins not in boardrooms insulated by excess capital, but in cities where bandwidth is scarce and community trust is absolute, technology takes on a very different character.',
    content: `<p>When innovation begins not in boardrooms insulated by excess capital, but in cities where bandwidth is scarce and community trust is absolute, technology takes on a very different character. For twenty years, global tech narratives followed a single template: copy Silicon Valley, scale at all costs, extract surplus, and disrupt without accountability.</p>

<p>Across Nairobi, Lagos, Kigali, and Accra, a fundamentally different technological ethos is taking root. It is an architecture shaped by constraint, communal reciprocity, and longevity rather than endless venture subsidies.</p>

<blockquote>"True technological autonomy does not come from adopting another civilization's tools uncritically; it comes from forging instruments that speak our idioms and respect our ground."</blockquote>

<h2>The Architecture of Resilient Networks</h2>
<p>In Nairobi's tech corridors, engineers do not build assuming five-nines grid reliability. They build systems that synchronize offline, store value across federated cooperative ledgers, and tolerate network fragmentation with grace. This is not technical compromise; it is superior fault-tolerant engineering.</p>

<p>When you engineer for friction, your systems survive conditions that bring fragile monocultures to their knees. What began as necessity has emerged as an exportable standard of dignity and performance.</p>

<h2>Stories Written in Code and Concrete</h2>
<p>We are witnessing the emergence of local data sovereign institutions, vernacular publishing platforms, and agricultural intelligence networks designed not to replace farmers, but to amplify their generational memory. As writers and builders, our obligation is to document this renaissance in our own language.</p>`,
    coverImage: '/src/assets/images/story_african_tech_1791912314761.jpg',
    format: 'featured',
    authorId: 'author-kwame',
    author: MOCK_AUTHORS[1],
    publishedAt: 'October 11, 2026',
    readingTimeMinutes: 7,
    topic: 'African Technology',
    tags: ['African Technology', 'Engineering', 'Culture', 'Infrastructure'],
    clapsCount: 428,
    commentsCount: 34,
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: 'story-quiet-discipline',
    slug: 'the-quiet-discipline-of-starting-again',
    title: 'The Quiet Discipline of Starting Again',
    subtitle: 'On unfinished manuscripts, discarded drafts, and the courage to meet the blank page without resentment.',
    excerpt: 'Every serious writer knows the sudden chill of page forty-two: the moment when the incandescent certainty that carried the opening scenes burns down to gray embers.',
    content: `<p>Every serious writer knows the sudden chill of page forty-two: the moment when the incandescent certainty that carried the opening scenes burns down to gray embers, leaving only the clumsy architecture of what you actually know.</p>

<p>The amateur believes this is an omen to abandon the craft. The professional understands that this is where writing truly begins: in the quiet, unromantic labor of clearing the table and beginning once more.</p>

<blockquote>"Starting again is not an admission of defeat; it is the fundamental ritual of clarity."</blockquote>

<h2>The Illusion of the First Effort</h2>
<p>Modern culture worships the spontaneous prodigy. We celebrate the overnight draft, the effortless stroke of genius. Yet literature has always belonged to the patient lapidaries: Flaubert laboring over a solitary adjective for three days, Virginia Woolf pacing through Sussex fields until a rhythm emerged.</p>

<p>To discard three months of work is an act of deep reverence toward the idea. You are not throwing away your time; you are paying tuition for the perspective required to finish the work properly.</p>

<h2>A Morning Protocol</h2>
<p>Sit down before the world demands your attention. Turn off the notifications, keep the fountain pen filled, and write one sentence that cannot be easily disproven. Do this every morning, and the book will arrive not through force, but through relentless presence.</p>`,
    coverImage: '/src/assets/images/story_quiet_discipline_1791912314955.jpg',
    format: 'horizontal',
    authorId: 'user-current',
    author: CURRENT_USER,
    publishedAt: 'October 9, 2026',
    readingTimeMinutes: 5,
    topic: 'The Craft of Writing',
    tags: ['Writing', 'Discipline', 'Creativity', 'Reflections'],
    clapsCount: 612,
    commentsCount: 48,
    isBookmarked: false,
    isLiked: true,
  },
  {
    id: 'story-developer-write',
    slug: 'why-every-developer-should-learn-to-write',
    title: 'Why Every Developer Should Learn to Write',
    subtitle: 'Code is executed by machines, but designed for human comprehension. Prose is the ultimate architecture tool.',
    excerpt: 'The finest software engineers I have ever worked with were not distinguished by their typing speed or encyclopedic recall of framework APIs. They were writers.',
    content: `<p>The finest software engineers I have ever worked with were not distinguished by their typing speed or encyclopedic recall of framework APIs. They were writers. They possessed the rare capacity to translate amorphous human ambiguity into crisp, legible paragraphs before writing a single line of code.</p>

<p>When an engineer struggles to explain a technical proposal in three coherent paragraphs, they do not have a communication problem; they have an architecture problem. Ambiguity in prose reveals flaws in system models long before tests begin to fail.</p>

<blockquote>"Writing is thinking on paper. If you cannot describe what a module does in clear prose, you do not understand what that module does."</blockquote>

<h2>The High Cost of Muddled Specifications</h2>
<p>Software development is mostly reading and revising. We spend eighty percent of our cognitive budget deciphering what our predecessors meant when they named a variable or grouped three unrelated responsibilities in one controller.</p>

<p>A well-crafted RFC (Request for Comments) saves weeks of engineering toil. It anticipates edge cases, articulates trade-offs, and documents what we chose <em>not</em> to build.</p>

<h2>How to Practice Literary Engineering</h2>
<p>Begin with your commit messages. Treat each pull request summary like a short essay for an intelligent reader. Document invariants not with code comments that rot, but with enduring system design narratives.</p>`,
    coverImage: '/src/assets/images/story_developer_writer_1791912316690.jpg',
    format: 'horizontal',
    authorId: 'author-marcus',
    author: MOCK_AUTHORS[3],
    publishedAt: 'October 8, 2026',
    readingTimeMinutes: 6,
    topic: 'Digital Craftsmanship',
    tags: ['Software', 'Writing', 'Engineering', 'Thought'],
    clapsCount: 890,
    commentsCount: 72,
    isBookmarked: true,
    isLiked: false,
  },
  {
    id: 'story-letter-becoming',
    slug: 'a-letter-to-the-person-i-am-becoming',
    title: 'A Letter to the Person I Am Becoming',
    subtitle: 'A meditation on quiet aging, letting go of false urgencies, and keeping faith with youthful promises.',
    excerpt: 'Do not hurry. The things that endure were never assembled in a single afternoon of panicked striving.',
    content: `<p>I write this to you from a rainy balcony in autumn, when the chestnut leaves have turned the exact color of toasted honey. You will likely read this ten years from now, when the questions that kept me awake tonight have either dissolved or deepened into stone.</p>

<p>If you have kept only one thing from this decade, let it be the capacity to sit undisturbed in a room with a book and an open window. Do not let the acceleration of the market convince you that every feeling must be turned into a commodity or a performance.</p>

<blockquote>"Forgive yourself for the paths you did not choose; they were necessary sacrifices for the life you now inhabit."</blockquote>

<p>Stay loyal to the people who knew you before you learned how to explain yourself. Speak softly, hold your convictions gently, and never lose your wonder at the rhythm of a well-balanced sentence.</p>`,
    coverImage: '/src/assets/images/hero_editorial_desk_1791912314353.jpg',
    format: 'grid',
    authorId: 'author-clara',
    author: MOCK_AUTHORS[2],
    publishedAt: 'October 6, 2026',
    readingTimeMinutes: 4,
    topic: 'Creative Nonfiction',
    tags: ['Personal Essay', 'Poetry', 'Aging', 'Memory'],
    clapsCount: 540,
    commentsCount: 29,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 'story-ideas-time',
    slug: 'the-beauty-of-ideas-that-take-time',
    title: 'The Beauty of Ideas That Take Time',
    subtitle: 'In praise of the slow gestation: why the deepest books, thoughts, and institutions cannot be microwaved.',
    excerpt: 'We live in an epoch obsessed with real-time feedback. But ideas that alter the course of a life require cellar fermentation, away from premature light.',
    content: `<p>We live in an epoch obsessed with real-time feedback. We measure essays by day-one click velocity, manuscripts by quarterly launch windows, and conversations by response latency. Yet almost every thought that has sustained human civilization required years of silent gestation before reaching the page.</p>

<p>Consider Darwin keeping his notebooks in a walnut drawer for two decades, testing every observation against barnacles and earthworms. Consider Toni Morrison waking at four in the morning for years before a single publisher took notice.</p>

<blockquote>"To write slowly is an act of political resistance against the tyranny of the ephemeral feed."</blockquote>

<p>When you protect an idea from premature exposure, you allow it to gather root depth. You test its logic against changing seasons. What emerges is not a fleeting reaction to yesterday's headlines, but a timeless offering.</p>`,
    coverImage: '/src/assets/images/story_ideas_time_1791912316437.jpg',
    format: 'grid',
    authorId: 'author-julian',
    author: MOCK_AUTHORS[5],
    publishedAt: 'October 4, 2026',
    readingTimeMinutes: 8,
    topic: 'Philosophy of Mind',
    tags: ['Philosophy', 'Slow Culture', 'Deep Work', 'Reading'],
    clapsCount: 715,
    commentsCount: 56,
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: 'story-nobody-tells-code',
    slug: 'what-nobody-tells-you-about-learning-to-code',
    title: 'What Nobody Tells You About Learning to Code',
    subtitle: 'The tutorials teach syntax, but they cannot prepare you for the emotional endurance required to live with confusion.',
    excerpt: 'The true barrier to becoming a programmer is not mathematical aptitude. It is the tolerance for sitting inside an abyss of bewilderment without panic.',
    content: `<p>Bootcamps and online curriculums sell a seductive fantasy: follow these twelve modules, memorize these twenty data structures, and you will emerge as a fluent architect of software. What they fail to convey is the sheer emotional endurance required to live inside constant bewilderment.</p>

<p>Programming is unique among human crafts because its primary medium is invisible logic. When a woodworker cuts a mortise incorrectly, the error is tangible in the timber. When software fails, the flaw exists in a realm of pure thought.</p>

<blockquote>"The difference between a junior developer and a veteran is that the veteran has learned not to take their confusion personally."</blockquote>

<p>Once you accept that confusion is the native state of the work, the anxiety lifts. You begin to treat each stack trace like a detective examining footprint patterns in damp mud. You become curious instead of defensive.</p>`,
    format: 'text-only',
    authorId: 'author-marcus',
    author: MOCK_AUTHORS[3],
    publishedAt: 'October 3, 2026',
    readingTimeMinutes: 5,
    topic: 'Digital Craftsmanship',
    tags: ['Programming', 'Learning', 'Patience', 'Psychology'],
    clapsCount: 680,
    commentsCount: 41,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 'story-folklore-future',
    slug: 'the-ancestral-geometry-of-west-african-parables',
    title: 'The Ancestral Geometry of West African Parables',
    subtitle: 'How traditional storytelling frameworks contain sophisticated systems of ecological balance and mutual aid.',
    excerpt: 'Oral literature is not a primitive prelude to the printed book; it is a hyper-dense compression algorithm for community survival.',
    content: `<p>For generations, European ethnographers cataloged West African oral tales as quaint moral fables meant to lull children to sleep. This was a catastrophic failure of reading. Parables in Wolof, Akan, and Yoruba traditions are sophisticated mathematical algorithms for distributed governance.</p>

<p>An Anansi tale is never merely about a spider outwitting a leopard. It is an exploration of asymmetric power, resource distribution under seasonal scarcity, and the ethical costs of cleverness without communal accountability.</p>

<blockquote>"When an elder dies without an apprentice, a library burns down without leaving ashes."</blockquote>

<p>Today, as we design digital platforms and civic institutions, we would do well to study these narrative architectures. They understood centuries ago that no system can survive if it allows a single actor to drain the common reservoir.</p>`,
    coverImage: '/src/assets/images/story_african_tech_1791912314761.jpg',
    format: 'horizontal',
    authorId: 'author-amara',
    author: MOCK_AUTHORS[4],
    publishedAt: 'October 2, 2026',
    readingTimeMinutes: 7,
    topic: 'Culture & Heritage',
    tags: ['Folklore', 'Orality', 'Ecology', 'Africa'],
    clapsCount: 490,
    commentsCount: 38,
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: 'story-solitude-winter',
    slug: 'solitude-as-a-second-language',
    title: 'Solitude as a Second Language',
    subtitle: 'Learning to dwell alone without transforming stillness into loneliness or isolation into exile.',
    excerpt: 'Most people treat quiet like an empty vessel that must be immediately filled with podcasts, notifications, or background music.',
    content: `<p>Most people treat quiet like an empty vessel that must be immediately filled with podcasts, notifications, or ambient television noise. Silence has become a foreign terrain, accompanied by the vague anxiety that something must be going wrong if nobody is speaking to us.</p>

<p>Yet solitude is not an absence. It is a presence: the presence of your own uncurated thoughts, the texture of your breath against the cooler air of twilight, the sound of rain finding the gutter outside your room.</p>

<p>Once you become fluent in solitude, loneliness loses its fangs. You no longer enter relationships out of panic or publish words out of a frantic need to prove you still exist.</p>`,
    format: 'text-only',
    authorId: 'author-sylvia',
    author: MOCK_AUTHORS[6],
    publishedAt: 'September 29, 2026',
    readingTimeMinutes: 4,
    topic: 'Creative Nonfiction',
    tags: ['Solitude', 'Mindfulness', 'Writing', 'Essays'],
    clapsCount: 512,
    commentsCount: 22,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 'story-letterpress-notes',
    slug: 'movable-type-in-the-age-of-infinite-scroll',
    title: 'Movable Type in the Age of Infinite Scroll',
    subtitle: 'What setting hot lead by hand taught me about the weight of every printed vowel.',
    excerpt: 'When each comma weighs four grams of lead alloy and takes ninety seconds to justify, you do not write careless sentences.',
    content: `<p>When each comma weighs four grams of lead alloy and takes ninety seconds to justify inside a wooden composing stick, you do not write careless sentences. You look at every modifier with ruthless skepticism. Does this adverb justify carrying its weight across the print shop floor?</p>

<p>The digital screen has eliminated the physical cost of verbosity. Because an infinite number of words can be generated for zero marginal electricity, we are drowning in slack prose. Returning to the letterpress is a reminder that ink has dignity.</p>`,
    coverImage: '/src/assets/images/story_ideas_time_1791912316437.jpg',
    format: 'grid',
    authorId: 'author-clara',
    author: MOCK_AUTHORS[2],
    publishedAt: 'September 27, 2026',
    readingTimeMinutes: 6,
    topic: 'The Craft of Writing',
    tags: ['Typography', 'Letterpress', 'Craft', 'Books'],
    clapsCount: 640,
    commentsCount: 31,
    isBookmarked: false,
    isLiked: true,
  },
  {
    id: 'story-beirut-verses',
    slug: 'translating-the-untranslatable-in-beirut',
    title: 'Translating the Untranslatable in Beirut',
    subtitle: 'Between Arabic and English: how grief and devotion require different vowels to ring true.',
    excerpt: 'Some languages carry memory in their consonants; others hide it in the breath between syllables.',
    content: `<p>To translate poetry from classical Arabic to modern English is to discover that certain emotional architectures cannot cross the Mediterranean without shedding their foundation. How do you translate <em>shawq</em>—that intense, bone-gnawing longing that is simultaneously ache and spiritual grace?</p>

<p>In English, we say "I miss you", which is sparse and transactional. In Arabic, you say <em>tawahhashani</em>—the feeling that someone’s absence has turned you into an uninhabited wilderness.</p>`,
    format: 'text-only',
    authorId: 'author-tariq',
    author: MOCK_AUTHORS[7],
    publishedAt: 'September 25, 2026',
    readingTimeMinutes: 5,
    topic: 'Poetry & Translation',
    tags: ['Poetry', 'Arabic', 'Translation', 'Literature'],
    clapsCount: 780,
    commentsCount: 64,
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: 'story-first-paragraph',
    slug: 'the-sacred-duty-of-the-first-paragraph',
    title: 'The Sacred Duty of the First Paragraph',
    subtitle: 'How great openings establish contract, tempo, and moral stakes within eighty words.',
    excerpt: 'The reader is giving you the rarest currency in the modern economy: their undivided attention. Do not waste the first three sentences clearing your throat.',
    content: `<p>The reader who clicks your headline is making an act of radical trust. In an era where eight competing notifications chime every minute, they have paused to listen to your voice. Do not begin by clearing your throat.</p>

<p>Look at Melville: "Call me Ishmael." Three syllables. An invitation that immediately questions identity and destiny. Look at Joan Didion: "We tell ourselves stories in order to live." A philosophical thesis and a warning in nine words.</p>`,
    coverImage: '/src/assets/images/hero_editorial_desk_1791912314353.jpg',
    format: 'horizontal',
    authorId: 'user-current',
    author: CURRENT_USER,
    publishedAt: 'September 21, 2026',
    readingTimeMinutes: 4,
    topic: 'The Craft of Writing',
    tags: ['Writing', 'Style', 'Opening Lines', 'Essays'],
    clapsCount: 825,
    commentsCount: 53,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 'story-reading-memory',
    slug: 'why-we-forget-most-of-what-we-read',
    title: 'Why We Forget Most of What We Read',
    subtitle: 'The neuroscience of reading retention, margin notes, and building a palace of permanent ideas.',
    excerpt: 'If you read sixty books this year but cannot recall a single argument from fifty of them, were you reading or were you merely consuming letters?',
    content: `<p>If you read sixty books this year but cannot recall a single argument from fifty of them, were you reading or were you merely consuming letters like popcorn? Speed reading is a symptom of vanity, not intellectual hunger.</p>

<p>To truly possess a book, you must write inside it. You must argue with the author in the margins, fold down the corners that angered you, and copy the sentences that stopped your heart into a commonplace notebook.</p>`,
    coverImage: '/src/assets/images/story_developer_writer_1791912316690.jpg',
    format: 'grid',
    authorId: 'author-julian',
    author: MOCK_AUTHORS[5],
    publishedAt: 'September 18, 2026',
    readingTimeMinutes: 6,
    topic: 'Philosophy of Mind',
    tags: ['Memory', 'Reading', 'Cognition', 'Books'],
    clapsCount: 930,
    commentsCount: 84,
    isBookmarked: true,
    isLiked: true,
  },
];

export const MOCK_TOPICS: Topic[] = [
  {
    id: 't-craft',
    name: 'The Craft of Writing',
    slug: 'the-craft-of-writing',
    storyCount: 142,
    description: 'Disciplines, techniques, and reflections on bringing prose and poetry into the world.',
  },
  {
    id: 't-tech',
    name: 'African Technology',
    slug: 'african-technology',
    storyCount: 89,
    description: 'Autonomous infrastructures, digital sovereignty, and innovative architectures across the continent.',
  },
  {
    id: 't-nonfiction',
    name: 'Creative Nonfiction',
    slug: 'creative-nonfiction',
    storyCount: 210,
    description: 'Memoir, personal narrative, and literary journalism grounded in lived experience.',
  },
  {
    id: 't-philosophy',
    name: 'Philosophy of Mind',
    slug: 'philosophy-of-mind',
    storyCount: 98,
    description: 'Consciousness, slow cognition, attention ethics, and contemporary epistemology.',
  },
  {
    id: 't-digital',
    name: 'Digital Craftsmanship',
    slug: 'digital-craftsmanship',
    storyCount: 114,
    description: 'Engineering systems with literary clarity, architectural restraint, and human scale.',
  },
  {
    id: 't-poetry',
    name: 'Poetry & Translation',
    slug: 'poetry-and-translation',
    storyCount: 76,
    description: 'Verse, cadence, and the delicate art of moving meaning across linguistic borders.',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    storyId: 'story-african-tech',
    author: {
      name: 'Amara Diallo',
      username: 'amaradiallo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'This paragraph on friction as an engineering virtue resonates deeply. In Dakar, we saw fintech platforms succeed precisely because they didn’t presume uninterrupted fiber connectivity. Beautifully argued, Kwame.',
    createdAt: '2 days ago',
    clapsCount: 28,
    isLiked: true,
    replies: [
      {
        id: 'reply-1-1',
        storyId: 'story-african-tech',
        author: {
          name: 'Kwame Mensah',
          username: 'kwamemensah',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
        },
        content: 'Thank you Amara. The next piece will look into cooperative data trusts in agricultural value chains—would love your perspective on how communal governance maps to digital registries.',
        createdAt: '1 day ago',
        clapsCount: 14,
      },
    ],
  },
  {
    id: 'comment-2',
    storyId: 'story-quiet-discipline',
    author: {
      name: 'Marcus Vance',
      username: 'marcusvance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: '"Starting again is not an admission of defeat; it is the fundamental ritual of clarity." This line alone justified my morning reading time. Elena, thank you for putting words to what every writer dreads to admit.',
    createdAt: '3 days ago',
    clapsCount: 42,
    isLiked: false,
  },
  {
    id: 'comment-3',
    storyId: 'story-developer-write',
    author: {
      name: 'Julian Chen',
      username: 'julianchen',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'So many engineering teams throw more Jira tickets and complex microservices at problems that were fundamentally caused by bad writing in the initial specification. Clarity of prose is clarity of architecture.',
    createdAt: '4 days ago',
    clapsCount: 31,
  },
  {
    id: 'comment-4',
    storyId: 'story-letter-becoming',
    author: {
      name: 'Sylvia Oakhaven',
      username: 'sylviawrites',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'The imagery of autumn chestnut leaves turned the color of toasted honey brought an immediate hush to my afternoon. A masterclass in gentle, sustained rhythm.',
    createdAt: '5 days ago',
    clapsCount: 19,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'clap',
    actor: {
      name: 'Kwame Mensah',
      username: 'kwamemensah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    },
    storyTitle: 'The Quiet Discipline of Starting Again',
    storySlug: 'the-quiet-discipline-of-starting-again',
    createdAt: '20 minutes ago',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'comment',
    actor: {
      name: 'Marcus Vance',
      username: 'marcusvance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    },
    storyTitle: 'The Quiet Discipline of Starting Again',
    storySlug: 'the-quiet-discipline-of-starting-again',
    message: 'commented: "Starting again is not an admission of defeat..."',
    createdAt: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'follow',
    actor: {
      name: 'Clara Lindqvist',
      username: 'claralind',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    },
    createdAt: '5 hours ago',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'publication',
    actor: {
      name: 'Kwame Mensah',
      username: 'kwamemensah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    },
    storyTitle: 'The Future We Can Build with African Technology',
    storySlug: 'the-future-we-can-build-with-african-technology',
    createdAt: '1 day ago',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'mention',
    actor: {
      name: 'Tariq Al-Mansoor',
      username: 'tariqmansoor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
    },
    storyTitle: 'Translating the Untranslatable in Beirut',
    storySlug: 'translating-the-untranslatable-in-beirut',
    message: 'referenced your essay on the craft of deliberate living.',
    createdAt: '2 days ago',
    read: true,
  },
  {
    id: 'notif-6',
    type: 'clap',
    actor: {
      name: 'Amara Diallo',
      username: 'amaradiallo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    },
    storyTitle: 'The Sacred Duty of the First Paragraph',
    storySlug: 'the-sacred-duty-of-the-first-paragraph',
    createdAt: '3 days ago',
    read: true,
  },
];

export const MOCK_DRAFTS: Draft[] = [
  {
    id: 'draft-1',
    title: 'On the Dignity of Obsolete Tools',
    subtitle: 'Why fountain pens, mechanical watches, and paper filing systems sharpen cognitive fidelity.',
    content: '<p>There is an intentional friction to physical apparatus that software engineers spend lifetimes attempting to remove...</p>',
    coverImage: '/src/assets/images/hero_editorial_desk_1791912314353.jpg',
    topic: 'Philosophy of Mind',
    tags: ['Slow Living', 'Craft', 'Tools'],
    wordCount: 1420,
    updatedAt: 'Today at 09:14 AM',
  },
  {
    id: 'draft-2',
    title: 'The Great Architectural Silences',
    subtitle: 'What Gothic stone vaults teach us about structural pauses in long-form prose.',
    content: '<p>A building does not impress through stone alone; it commands reverie through the air it encloses between its buttresses...</p>',
    coverImage: '/src/assets/images/story_quiet_discipline_1791912314955.jpg',
    topic: 'The Craft of Writing',
    tags: ['Architecture', 'Prose', 'Pacing'],
    wordCount: 940,
    updatedAt: 'Yesterday at 4:30 PM',
  },
  {
    id: 'draft-3',
    title: 'Notes on Nairobi Nocturnes',
    subtitle: 'A prose poem sequence recorded along Ngong Road during late-night thunderstorm season.',
    content: '<p>The jacaranda blossoms fall like purple indigo stamps on wet macadam, washed clean by thirty minutes of torrential skies...</p>',
    coverImage: '/src/assets/images/story_african_tech_1791912314761.jpg',
    topic: 'Poetry & Translation',
    tags: ['Poetry', 'Nairobi', 'Night'],
    wordCount: 620,
    updatedAt: 'October 10, 2026',
  },
  {
    id: 'draft-4',
    title: 'The Grammar of Computational Systems',
    subtitle: 'Translating linguistic case endings into database invariants.',
    content: '<p>In Finnish, fifteen distinct noun cases encode spatial relationships with ruthless grammatical economy...</p>',
    topic: 'Digital Craftsmanship',
    tags: ['Linguistics', 'Code', 'Architecture'],
    wordCount: 1850,
    updatedAt: 'October 8, 2026',
  },
  {
    id: 'draft-5',
    title: 'Letters from the Borderline',
    subtitle: 'Reflections on dual citizenship and belonging everywhere and nowhere.',
    content: '<p>When asked where home resides, I point not to a parcel of soil but to a shelf of well-traveled volumes...</p>',
    topic: 'Creative Nonfiction',
    tags: ['Memoir', 'Identity', 'Travel'],
    wordCount: 1100,
    updatedAt: 'October 5, 2026',
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: MOCK_AUTHORS[1], // Kwame
    lastMessage: 'I loved the essay draft. Let me review the infrastructure sections tomorrow morning.',
    lastMessageTime: '12m ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        senderId: 'author-kwame',
        text: 'Elena, have you had a chance to read the notes on distributed cooperatives I sent over?',
        timestamp: '10:15 AM',
      },
      {
        id: 'm-2',
        senderId: 'user-current',
        text: 'Yes! The distinction between extraction and communal tenure is so sharp. I’m weaving it into Chapter 3.',
        timestamp: '10:24 AM',
      },
      {
        id: 'm-3',
        senderId: 'author-kwame',
        text: 'I loved the essay draft. Let me review the infrastructure sections tomorrow morning.',
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    participant: MOCK_AUTHORS[2], // Clara
    lastMessage: 'The letterpress proof came out breathtakingly sharp. Will send over a photo.',
    lastMessageTime: '3h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm-2-1',
        senderId: 'user-current',
        text: 'Clara, did the specimen proofs arrive from the foundry in Stockholm?',
        timestamp: 'Yesterday',
      },
      {
        id: 'm-2-2',
        senderId: 'author-clara',
        text: 'The letterpress proof came out breathtakingly sharp. Will send over a photo.',
        timestamp: '3h ago',
      },
    ],
  },
  {
    id: 'conv-3',
    participant: MOCK_AUTHORS[3], // Marcus
    lastMessage: 'Your point on why writing RFCs is the highest form of system architecture resonated with our entire team.',
    lastMessageTime: '1d ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm-3-1',
        senderId: 'author-marcus',
        text: 'Your point on why writing RFCs is the highest form of system architecture resonated with our entire team.',
        timestamp: '1d ago',
      },
    ],
  },
  {
    id: 'conv-4',
    participant: MOCK_AUTHORS[4], // Amara
    lastMessage: 'Looking forward to our literary salon panel next Thursday!',
    lastMessageTime: '3d ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm-4-1',
        senderId: 'author-amara',
        text: 'Looking forward to our literary salon panel next Thursday!',
        timestamp: '3d ago',
      },
    ],
  },
];

export const WRITING_PROMPT_OF_THE_DAY = {
  title: 'The Room You Left Behind',
  prompt: 'Write about a room you lived in during a pivotal year of your youth that no longer exists in that state. What was the light like at five in the evening?',
  contributionsCount: 84,
};

export const MOCK_STATUSES: WriterStatus[] = [
  {
    id: 'status-1',
    authorId: 'author-kwame',
    author: MOCK_AUTHORS[1],
    text: 'Writing about decentralized microgrids from an open terrace in Osu. The power fluctuated twice, but the local solar bank kept every packet moving. That is resilience.',
    bgGradient: 'from-blue-900 to-indigo-950',
    imageUrl: '/src/assets/images/story_african_tech_1791912314761.jpg',
    createdAt: '45m ago',
    viewsCount: 218,
    reactionsCount: 42,
  },
  {
    id: 'status-2',
    authorId: 'author-clara',
    author: MOCK_AUTHORS[2],
    text: 'Finished poem #14 for "The Geometry of Winter Solitude". In verse, the silence between words carries twice the physical mass of sound.',
    bgGradient: 'from-amber-900 via-stone-900 to-black',
    imageUrl: '/src/assets/images/story_ideas_time_1791912316437.jpg',
    createdAt: '2h ago',
    viewsCount: 340,
    reactionsCount: 68,
  },
  {
    id: 'status-3',
    authorId: 'author-marcus',
    author: MOCK_AUTHORS[3],
    text: 'If you cannot explain why a software function exists in one clean paragraph of prose, you are building an accident, not an architecture.',
    bgGradient: 'from-blue-950 to-slate-900',
    imageUrl: '/src/assets/images/story_developer_writer_1791912316690.jpg',
    createdAt: '3h ago',
    viewsCount: 512,
    reactionsCount: 95,
  },
  {
    id: 'status-4',
    authorId: 'user-current',
    author: CURRENT_USER,
    text: 'Early morning coffee, rain on the balcony glass, and the quiet discipline to meet the discarded chapter without resentment.',
    bgGradient: 'from-stone-900 to-neutral-950',
    imageUrl: '/src/assets/images/story_quiet_discipline_1791912314955.jpg',
    createdAt: '5h ago',
    viewsCount: 680,
    reactionsCount: 124,
  },
  {
    id: 'status-5',
    authorId: 'author-julian',
    author: MOCK_AUTHORS[5],
    text: 'We confuse fast retrieval with deep comprehension. A single sentence that halts you for ten minutes leaves a permanent geological deposit in your consciousness.',
    bgGradient: 'from-indigo-950 via-slate-900 to-amber-950',
    imageUrl: '/src/assets/images/hero_editorial_desk_1791912314353.jpg',
    createdAt: '7h ago',
    viewsCount: 420,
    reactionsCount: 88,
  },
];

