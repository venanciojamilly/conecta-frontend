const db = {
  users: [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      password: "123456",
      role: "client",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria@email.com",
      password: "123456",
      role: "provider",
      avatar: "https://i.pravatar.cc/150?img=5",
      category: "Limpeza",
      description: "Faxineira com 10 anos de experiência em residências e empresas.",
      price: 120,
      city: "Campina Grande",
      rating: 4.8,
      reviews: 34,
      portfolio: [
        "https://picsum.photos/seed/clean1/400/300",
        "https://picsum.photos/seed/clean2/400/300",
        "https://picsum.photos/seed/clean3/400/300"
      ]
    },
    {
      id: 3,
      name: "Carlos Elétrica",
      email: "carlos@email.com",
      password: "123456",
      role: "provider",
      avatar: "https://i.pravatar.cc/150?img=12",
      category: "Elétrica",
      description: "Eletricista certificado, instalações e reparos residenciais e comerciais.",
      price: 150,
      city: "Campina Grande",
      rating: 4.9,
      reviews: 58,
      portfolio: [
        "https://picsum.photos/seed/elec1/400/300",
        "https://picsum.photos/seed/elec2/400/300"
      ]
    },
    {
      id: 4,
      name: "Admin",
      email: "admin@conecta.com",
      password: "admin123",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=60"
    },
    {
      id: 5,
      name: "Ana Hidráulica",
      email: "ana@email.com",
      password: "123456",
      role: "provider",
      avatar: "https://i.pravatar.cc/150?img=9",
      category: "Hidráulica",
      description: "Encanadora com experiência em reparos de vazamentos e instalações.",
      price: 130,
      city: "João Pessoa",
      rating: 4.7,
      reviews: 21,
      portfolio: [
        "https://picsum.photos/seed/hidro1/400/300",
        "https://picsum.photos/seed/hidro2/400/300"
      ]
    },
    {
      id: 6,
      name: "Paulo Montador",
      email: "paulo@email.com",
      password: "123456",
      role: "provider",
      avatar: "https://i.pravatar.cc/150?img=15",
      category: "Montagem",
      description: "Montador de móveis planejados e modulados com agilidade e precisão.",
      price: 100,
      city: "Campina Grande",
      rating: 4.6,
      reviews: 47,
      portfolio: [
        "https://picsum.photos/seed/mont1/400/300",
        "https://picsum.photos/seed/mont2/400/300"
      ]
    }
  ],
  categories: [
    { id: 1, label: "Limpeza", icon: "🧹" },
    { id: 2, label: "Elétrica", icon: "⚡" },
    { id: 3, label: "Hidráulica", icon: "🔧" },
    { id: 4, label: "Montagem", icon: "🪛" },
    { id: 5, label: "Pintura", icon: "🖌️" },
    { id: 6, label: "Jardinagem", icon: "🌿" }
  ]
  ,

  // adicione dentro do objeto do db, após categories:
reviews: [
  {
    id: 1,
    providerId: 2,
    clientName: 'João Silva',
    rating: 5,
    comment: 'Serviço excelente, muito pontual e caprichosa!',
    date: '10/03/2026'
  },
  {
    id: 2,
    providerId: 2,
    clientName: 'Fernanda Costa',
    rating: 4,
    comment: 'Ótimo serviço, recomendo!',
    date: '08/03/2026'
  },
  {
    id: 3,
    providerId: 3,
    clientName: 'Roberto Alves',
    rating: 5,
    comment: 'Resolveu o problema rápido e cobrou justo.',
    date: '05/03/2026'
  },
],
servicosContratados: [
  { clientId: 1, providerId: 2 }, // João contratou Maria
  { clientId: 1, providerId: 3 }, // João contratou Carlos
]
}

export default db