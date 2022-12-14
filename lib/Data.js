export const branches = [
  {
    name: 'Biotechnology',
    branchId:'dd373509-1179-4246-84af-9107e5fe7115',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'Chemical Engineering',
    branchId:'33ed81e2-30e5-4af2-9171-f37044dbec03',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  },
  {
    name: 'Civil Engineering',
    branchId:'0d378cf2-53e9-478e-80d9-e33a96814f13',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Mechanical Engineering',
    branchId:'9caa616e-b8cb-4f91-af07-a66ca8aedee9',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Information Technology',
    branchId:'4d71de01-7a83-49e5-927c-669bd82f0b3b',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Electronics & Communication Engineering',
    branchId:'374d5d17-26c3-4455-9e11-c02be3f8ceef',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Electrical Engineering',
    branchId:'ffbad6e2-8338-440a-8a28-bbf4b6265b4e',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Computer Science & Engineering',
    branchId:'7a3828f2-8ad8-4be5-aaae-583bc9410188',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Production & Industrial Engineering',
    branchId: '72e03d1e-78e7-40eb-a076-3bbc47700f7c',
    image:'https://i.pinimg.com/564x/39/38/e5/3938e57ede81e22977c3a2e406edb28e.jpg'
  }
];

export const bloodGroups = [
  {
    blood:'A+',
    bloodValue:'Apositive'
  },
  {
    blood:'A-',
    bloodValue:'Anegative'
  },
  {
    blood:'B+',
    bloodValue:'Bpositive'
  },
  {
    blood:'B-',
    bloodValue:'Bnegative'
  },
  {
    blood:'AB+',
    bloodValue:'ABpositive'
  },
  {
    blood:'AB-',
    bloodValue:'ABnegative'
  },
  {
    blood:'O+',
    bloodValue:'Opositive'
  },
  {
    blood:'O-',
    bloodValue:'Onegative'
  },
];
export const semesters = [
  {
    name: 'nature',
    branchId:'29dbb1fb-b834-4910-858d-a60a54751bfe',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'art',
    branchId:'d6b406e9-e5b9-47ef-90ad-7fe4fe43816a',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  },
  {
    name: 'animals',
    branchId:'55a3ada7-0030-4a75-8d34-91dd1b468346',
    image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'Games',
    branchId: '62ca81b6-b236-4802-aa3c-0ca470e04504',
    image:'https://i.pinimg.com/564x/39/38/e5/3938e57ede81e22977c3a2e406edb28e.jpg'
  }
];
export const feedQuery = (start,end) => {
  const query = `*[_type == "book"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        postedBy->{
          _id,
          userName,
          image,
          about
        },
      }[${start}...${end}]`;
  return query;
};
    
export const collectionFeedQuery = `*[_type == "pinCollection" && count(pins)>2 && !isPrivate] | order(_createdAt desc) {
      _id,
      title,
      postedBy->{
        _id,
        userName,
        image
      },
      pins[]{
        _key,
        item->{
          _id,
          title,
          image{
            asset->{
              url
            }
          }
        }
      },
    } `;
  
export const categoryQuery = (start, end) => {
  const query = `*[_type == "category"] {
    _id,
    title,
    "pinCount":count(pins),
    pins[0..3]{
      _key,
      item->{
        _id,
        title,
        image{
          asset->{
            url
          }
        },
        postedBy->{
          _id,
          userName,
          image
        },
        likes[]{
          _key,
          likedBy->{
            _id,
            userName,
            image
          }
        },
        save[]{
          _key,
          postedBy->{
            _id,
          },
        },
      }
    },
  }[${start}...${end}]`;
  return query;
};

export const availableCategories = `*[_type == "branch"]{
  _id,
  title,
} `;

export const availableSemseter = `*[_type == "branch"]{
  _id,
  title,
} `;

export const collectionDetailQuery = (collectionId,requesterId) => {
  const query = `*[_type == "pinCollection" && _id == '${collectionId}' && (!isPrivate || (isPrivate && userId == '${requesterId}'))]{
    _id,
      title,
      about,
      isPrivate,
      postedBy->{
        _id,
        userName,
        image
      },
      pins[]{
        _key,
        item->{
          _id,
          title,
          destination,
          save[]{
            _key,
            postedBy->{
              _id,
            },
          },
          likes[]{
            _key,
            likedBy->{
              _id,
              userName,
              image
            }
          },
          postedBy->{
            _id,
            userName,
            image
          },
          image{
            asset->{
              url
            }
          }
        }
      },
      likes[]{
        _key,
        likedBy->{
          _id,
          userName,
          image
        }
      },
      save[]{
        _key,
        postedBy->{
          _id,
        },
      },
  }`;
  return query;
};

export const pinDetailQuery = (bookId) => {
  const query = `*[_type == "book" && _id == '${bookId}']{
    _id,
    author,
    price,
    semester,
    description,
    branch,
    postedBy->{
      _id,
      userName,
      image,
      email,
      phone,
    },
  }`;
  return query;
};

export const bloodQuery = (bloodType) => {
  const query = `*[_type == "user" && bloodGroup == '${bloodType}']{
    _id,
    userName,
    email,
    phone,
    bloodGroup,
  }`;
  return query;
};

export const sharePinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    _id,
    image{
      asset->{
        url
      }
    },
    title,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    likes[]{
      _key,
      likedBy->{
        _id,
        userName,
        image
      }
    },
    save[]{
      _key,
      postedBy->{
        _id,
      },
    },
  }`;
  return query;
};

export const branchDetailQuery = (branchId) => {
  const query = `*[_type == "branch" && _id == '${branchId}']{
    _id,
  title,
  bannerImage{
    asset->{
      url
    }
  },
  books[]{
    _key,
    item->{
      _id,
      title,
      image{
        asset->{
          url
        }
      },
      postedBy->{
        _id,
        userName,
        image
      },
    }
  },
  }`;
  return query;
};

export const pinDetailMorePinQuery = (book) => {
  const query = `*[_type == "book" && branch == '${book.branch}' && _id != '${book._id}' ]{
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        postedBy->{
          _id,
          userName,
          image
        },
  }[0...4]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "book" && title match '${searchTerm}*' || branch match '${searchTerm}*' || author match '${searchTerm}*' || description match '${searchTerm}*']{
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        author,
        branch,
        semsester,
        description,
        postedBy->{
          _id,
          userName,
          image
        },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCollectionQuery = (userId) => {
  const query = `*[ _type == 'pinCollection' && userId == '${userId}'] | order(_createdAt desc){
    _id,
    title,
    isPrivate,
    pins[]{
      _key,
      item->{
        _id,
        title
      }
    }
  }`;
  return query;
}

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'user' && _id == '${userId}']{
    'pins':uploads[].item->{
       image{
          asset->{
            url
          }
        },
        _id,
        title,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
    }
  }`;
  return query;
};


export const userLikedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in likes[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    title,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    likes[]{
      _key,
      likedBy->{
        _id,
        userName,
        image
      }
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};