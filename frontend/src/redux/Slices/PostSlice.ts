import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Poll, PollChoice, Post, PostImage, Reply, User } from "../../utils/GlobalInterfaces";
import axios from "axios";
import FormData from "form-data";
import { Rtt } from "@mui/icons-material";

export interface PostSliceState {
  loading: boolean;
  error: boolean;
  currentPost: Post | undefined;
  posts: Post[];
  currentPostImages: File[];
  currentReply: Reply | undefined;
  currentReplyImages: File[];
}

interface UpdatePostPayload {
  name: string;
  value: string | number | boolean | PostImage[];
}

interface CreatePostBody {
  content: string;
  author: User;
  images: PostImage[];
  poll: Poll | undefined;
  replies: Post[];
  scheduled: boolean;
  scheduledDate: Date | undefined;
  audience: "EVERYONE" | "CIRCLE";
  replyRestriction: "EVERYONE" | "FOLLOW" | "CIRCLE" | "MENTION";
  token: string;
}


interface CreateReplyBody {
  reply: Reply,
  token: string;
}

interface PostActionBody {
  postId: number;
  token: string;
}

interface CreatePostWithMedia extends CreatePostBody {
  imagesFiles: File[]
}

interface UpdatePollPayLoad {
  index: number;
  choiceText: string;
}

interface GenerateReplyPayload {
  post: Post,
  user: User,
}

/*
{
    "author": {
        "userId": "1"
    },
    "originalPost": "1",
    "replyContent": "This is reply with media",
    "images": [],
    "scheduled": false,
    "scheduledDate": null,
    "poll": null
}
*/
interface createReplyWithMediaBody {
  author: User;
  originalPost: number;
  replyContent: string;
  images: PostImage[],
  scheduled: boolean;
  scheduledDate:Date | undefined;
  poll: Poll | undefined;
  imagesFiles: File[]
  token:string;
}

export const createPost = createAsyncThunk(
  "post/create",
  async (body: CreatePostBody, thuckAPI) => {
    try {
      let post = {
        content: body.content,
        author: body.author,
        images: body.images,
        poll: body.poll,
        replies: body.replies,
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        audience: body.audience,
        replyRestriction: body.replyRestriction,
      };
      const req = await axios.post("http://localhost:8000/posts/", post, {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

export const createReply = createAsyncThunk(
  "post/reply",
  async (body: CreateReplyBody, thuckAPI) => {

    let reply = {
      author: body.reply.author,
      originalPost: body.reply.originalPost.postId,
      replyContent: body.reply.replyContent,
      images: body.reply.images,
      scheduled: body.reply.scheduled,
      scheduledDate: body.reply.scheduledDate,
      poll: body.reply.poll
    };
    try {
      const req = await axios.post("http://localhost:8000/posts/reply", reply, {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      return req.data;
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)

export const createPostWithMedia = createAsyncThunk(
  "post/createWithMedia",
  async (body: CreatePostWithMedia, thuckAPI) => {
    try {
      const images = body.imagesFiles
      let data = new FormData();

      let post = {
        content: body.content,
        author: body.author,
        replies: body.replies,
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        audience: body.audience,
        replyRestriction: body.replyRestriction,
      };

      data.append('post', JSON.stringify(post));

      images.forEach((image) => {
        data.append('media', image)
      })

      let config = {
        method: 'post',
        url: "http://localhost:8000/posts/media",
        headers: {
          'Authorization': `Bearer ${body.token}`,
          'Content-Type': 'multipart/form-data'
        },
        data
      }

      let res = await axios(config)
      return res.data;
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)


export const createReplyWithMedia = createAsyncThunk(
  "post/repostmedia",
  async (body: createReplyWithMediaBody, thuckAPI) => {
    try {
      const images = body.imagesFiles;
      let data = new FormData();

      let reply = {
        author: body.author,
        originalPost: body.originalPost,
        replyContent: body.replyContent,
        images: [],
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        poll: body.poll
      };

      data.append('reply', JSON.stringify(reply));

      images.forEach((image) => {
        data.append('media', image)
      })

      let config = {
        method: 'post',
        url: "http://localhost:8000/posts/reply/media",
        headers: {
          'Authorization': `Bearer ${body.token}`,
          'Content-Type': 'multipart/form-data'
        },
        data
      }

      let res = await axios(config)
      return res.data;      
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)


export const repostPost = createAsyncThunk(
  "post/repost",
  async (body: PostActionBody, thuckAPI) => {
    try {
      let req = await axios.put(`http://localhost:8000/posts/repost/${body.postId}`, {}, {
        headers: {
          "Authorization": `Bearer ${body.token}`,
        },
      });
      return req.data;
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)


export const likePost = createAsyncThunk(
  "post/like",
  async (body: PostActionBody, thuckAPI) => {
    try {
      let req = await axios.put(`http://localhost:8000/posts/like/${body.postId}`, {}, {
        headers: {
          "Authorization": `Bearer ${body.token}`,
        },
      });
      return req.data;
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)


export const bookmarkPost = createAsyncThunk(
  "post/bookmark",
  async (body: PostActionBody, thuckAPI) => {
    try {
      let req = await axios.put(`http://localhost:8000/posts/bookmark/${body.postId}`, {}, {
        headers: {
          "Authorization": `Bearer ${body.token}`,
        },
      });
      return req.data;
    }
    catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
)


const initialState: PostSliceState = {
  loading: false,
  error: false,
  currentPost: undefined,
  posts: [],
  currentPostImages: [],
  currentReply: undefined,
  currentReplyImages: []
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    initializeCurrentPost(state, action: PayloadAction<Post>) {
      if (!state.currentPost) {
        state.currentPost = action.payload;
      } else {
        state = {
          ...state,
          currentPost: action.payload,
        };
      }
      return state;
    },

    initializeCurrentReply(state, action: PayloadAction<GenerateReplyPayload>) {
      state = {
        ...state,
        currentReply: {
          author: action.payload.user,
          originalPost: action.payload.post,
          replyContent: "",
          images: [],
          scheduled: false,
        },
      // Clear `currentPost` and `currentPostImages`
      currentPost: undefined,
      currentPostImages: []
      }
      return state;
    },



    // updateCurrentPost(state, action: PayloadAction<UpdatePostPayload>) {
    //   if (state.currentPost) {
    //     state.currentPost = { 
    //       ...state.currentPost,
    //       [action.payload.name]: action.payload.value,
    //     };
    //   }else if(state.currentReply){
    //     state.currentReply={
    //       ...state.currentReply,
    //       [action.payload.name]: action.payload.value,
    //     }
    //   }  

    //   return state;
    // },

    updateCurrentPost(state, action: PayloadAction<UpdatePostPayload>) {
      if (state.currentPost) {
        state.currentPost = {
          ...state.currentPost,
          [action.payload.name]: action.payload.value,
        };
      } else if (state.currentReply) {
        state.currentReply = {
          ...state.currentReply,
          [action.payload.name]: action.payload.value,
        };
      }
      return state;
    },

    updateCurrentPostImages(state, action: PayloadAction<{ files: File[]; location: string }>) {
      // if(state.currentPost ){
      //   state= {
      //     ...state,
      //     currentPostImages: action.payload
      //   };
      // }else if( state.currentReply ){
      //   state= {
      //     ...state,
      //     currentReplyImages: action.payload
      //   };
      // }
      const { files, location } = action.payload;

      if (location === 'post') {
        state = {
          ...state,
          currentPostImages: files

        }
      } else if (location === 'reply') {
        state = {
          ...state,
          currentReplyImages: files

        }
      }
      return state;
    },

    createPoll(state) {
      let choices: PollChoice[] = [
        {
          pollChoiceId: 0,
          choiceText: "",
          votes: [],
        },
        {
          pollChoiceId: 0,
          choiceText: "",
          votes: [],
        },
      ];
      let poll: Poll = {
        pollId: 0,
        endTime: " :0:0",
        choices: choices,
      }

      if (state.currentPost) {
        let post = JSON.parse(JSON.stringify(state.currentPost))
        post = {
          ...post,
          poll
        }

        state = {
          ...state,
          currentPost: post
        };
      } else if (state.currentReply) {
        let reply = JSON.parse(JSON.stringify(state.currentReply))
        reply = {
          ...reply,
          poll
        }

        state = {
          ...state,
          currentReply: reply
        }
      }
      return state;
    },

    updatePoll(state, action: PayloadAction<UpdatePollPayLoad>) {

      if (state.currentPost && state.currentPost.poll) {
        let post = JSON.parse(JSON.stringify(state.currentPost))
        let poll = post.poll;
        let choices = poll.choices;
        if (choices.length - 1 < action.payload.index) {
          let choice: PollChoice = {
            pollChoiceId: 0,
            choiceText: action.payload.choiceText,
            votes: []
          }
          choices[action.payload.index] = choice
        } else {
          let choice: PollChoice = choices[action.payload.index]

          choice = {
            ...choice,
            choiceText: action.payload.choiceText
          }
          choices[action.payload.index] = choice

        }
        poll = {
          ...poll,
          choices: choices
        }
        post = {
          ...post,
          poll: poll
        }
        state = {
          ...state,
          currentPost: post
        }
      }
      return state;
    },

    removePoll(state) {
      if (state.currentPost && state.currentPost.poll) {
        let post = JSON.parse(JSON.stringify(state.currentPost))
        post = {
          ...post,
          poll: undefined
        }
        state = {
          ...state,
          currentPost: post
        }
      } else if (state.currentReply && state.currentReply.poll) {
        let reply = JSON.parse(JSON.stringify(state.currentReply))
        reply = {
          ...reply,
          poll: undefined
        }
        state = {
          ...state,
          currentReply: reply
        }
      }
      return state;
    },

    setPollData(state, action: PayloadAction<string>) {
      if (state.currentPost && state.currentPost.poll !== undefined) {
        let post = JSON.parse(JSON.stringify(state.currentPost))
        let poll = post.poll;

        poll = {
          ...poll,
          endTime: action.payload
        }
        post = {
          ...post,
          poll: poll
        }
        state = {
          ...state,
          currentPost: post
        }
      } else if (state.currentReply && state.currentReply.poll !== undefined) {
        let reply = JSON.parse(JSON.stringify(state.currentReply))
        let poll = reply.poll;

        poll = {
          ...poll,
          endTime: action.payload
        }

        reply = {
          ...reply,
          poll: poll
        }

        state = {
          ...state,
          currentReply: reply
        }

      }
      return state;
    },

    setScheduleData(state, action: PayloadAction<Date>) {
      if (state.currentPost) {
        let post: Post = JSON.parse(JSON.stringify(state.currentPost))
        post = {
          ...post,
          scheduledDate: action.payload,
          scheduled: true
        }
        state = {
          ...state,
          currentPost: post
        }
      } else if (state.currentReply) {
        let reply = JSON.parse(JSON.stringify(state.currentReply))
        reply = {
          ...reply,
          scheduledDate: action.payload,
          scheduled: true
        }
        state = {
          ...state,
          currentReply: reply
        }

      }
      return state;
    }


  },
  extraReducers(builder) {
    builder.addCase(createPost.pending, (state, action) => {
      state = {
        ...state,
        loading: true,
      };
      return state;
    });

    builder.addCase(createPostWithMedia.pending, (state, action) => {
      state = {
        ...state,
        loading: true,
      };
      return state;
    });


    builder.addCase(createPost.fulfilled, (state, action) => {
      let post: Post = action.payload;
      state = {
        ...state,
        posts: [post, ...state.posts],
        loading: false,
        error: false,
        currentPost: undefined,
      };
      return state;
    });


    builder.addCase(createReply.fulfilled, (state, action) => {
      state = {
        ...state,
        currentReply: undefined,
        loading: false,
        error: false,
        currentReplyImages: []
      }
      return state;
    });

    builder.addCase(createReplyWithMedia.fulfilled, (state, action) => {
      state={
        ...state,
        currentReply:undefined,
        loading: false,
        error: false,
        currentReplyImages:[]
      };
      return state;
    })

    builder.addCase(createPostWithMedia.fulfilled, (state, action) => {
      let post: Post = action.payload;
      state = {
        ...state,
        posts: [post, ...state.posts],
        loading: false,
        error: false,
        currentPost: undefined,
        currentPostImages: []
      };
      return state;
    });

    builder.addCase(repostPost.fulfilled, (state, action) => {
      //TODO: Setup such that it modified the current feeed page
      return state;
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      //TODO: Setup such that it modified the current feeed page
      return state;
    });

    builder.addCase(bookmarkPost.fulfilled, (state, action) => {
      //TODO: Setup such that it modified the current feeed page
      return state;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    builder.addCase(createPostWithMedia.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });
  },
});

export const { initializeCurrentPost, updateCurrentPost, updateCurrentPostImages,
  createPoll, updatePoll, removePoll, setPollData,
  setScheduleData, initializeCurrentReply } = PostSlice.actions;

export default PostSlice.reducer;
