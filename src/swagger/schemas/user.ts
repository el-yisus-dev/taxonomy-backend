export const USER = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1
      },
      email: {
        type: "string",
        format: "email",
        example: "moon@example.com"
      },
      username: {
        type: "string",
        example: "moondev"
      },
      name: {
        type: "string",
        example: "Moon"
      },
      lastName: {
        type: "string",
        example: "Developer"
      },
      role: {
        type: "string",
        enum: ["USER", "MODERATOR"],
        example: "USER"
      },
      cellphone: {
        type: "string",
        nullable: true,
        example: "+52 7711234567"
      },
      avatarUrl: {
        type: "string",
        nullable: true
      },
      isActive: {
        type: "boolean",
        example: true
      },
      emailVerified: {
        type: "boolean",
        example: false
      },
      lastLoginAt: {
        type: "string",
        format: "date-time",
        nullable: true
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      updatedAt: {
        type: "string",
        format: "date-time"
      }
    }
  },

  CreateUser: {
    type: "object",
    required: ["email", "username", "password", "name", "lastName"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      username: {
        type: "string"
      },
      password: {
        type: "string",
        format: "password"
      },
      name: {
        type: "string"
      },
      lastName: {
        type: "string"
      },
      cellphone: {
        type: "string"
      }
    }
  },

  UpdateUser: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Moon"
      },
      lastName: {
        type: "string",
        example: "Developer"
      },
      cellphone: {
        type: "string",
        example: "+52 7711234567"
      }
    }
  }
}