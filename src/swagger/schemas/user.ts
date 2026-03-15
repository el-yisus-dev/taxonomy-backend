export const USER = {
  User: {
    type: "object",
    description: "Represents a user in the system",
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier of the user",
        example: 1
      },
      email: {
        type: "string",
        format: "email",
        description: "User email address",
        example: "moon@example.com"
      },
      username: {
        type: "string",
        description: "Unique username used for login or identification",
        example: "moondev"
      },
      name: {
        type: "string",
        description: "User first name",
        example: "Moon"
      },
      lastName: {
        type: "string",
        description: "User last name",
        example: "Developer"
      },
      role: {
        type: "string",
        description: "Role assigned to the user",
        enum: ["USER", "MODERATOR"],
        example: "USER"
      },
      cellphone: {
        type: "string",
        nullable: true,
        description: "User cellphone number",
        example: "+52 7711234567"
      },
      avatarUrl: {
        type: "string",
        nullable: true,
        description: "URL of the user's profile avatar",
        example: "https://example.com/avatar.jpg"
      },
      isActive: {
        type: "boolean",
        description: "Indicates whether the user account is active",
        example: true
      },
      emailVerified: {
        type: "boolean",
        description: "Indicates whether the user's email has been verified",
        example: false
      },
      lastLoginAt: {
        type: "string",
        format: "date-time",
        nullable: true,
        description: "Timestamp of the user's last login",
        example: "2026-03-11T12:00:00Z"
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Date and time when the user account was created",
        example: "2026-03-10T10:00:00Z"
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Date and time when the user account was last updated",
        example: "2026-03-10T10:00:00Z"
      }
    }
  },

  CreateUser: {
    type: "object",
    description: "Payload required to create a new user",
    required: ["email", "username", "password", "name", "lastName"],
    properties: {
      email: {
        type: "string",
        format: "email",
        description: "User email address",
        example: "moon@example.com"
      },
      username: {
        type: "string",
        description: "Unique username chosen by the user",
        example: "moondev"
      },
      password: {
        type: "string",
        format: "password",
        description: "User password (will be securely hashed)",
        example: "StrongPassword123"
      },
      name: {
        type: "string",
        description: "User first name",
        example: "Moon"
      },
      lastName: {
        type: "string",
        description: "User last name",
        example: "Developer"
      },
      cellphone: {
        type: "string",
        description: "Optional cellphone number",
        example: "+52 7711234567"
      }
    }
  },

  UpdateUser: {
    type: "object",
    description: "Payload used to update user information",
    properties: {
      name: {
        type: "string",
        description: "Updated first name",
        example: "Moon"
      },
      lastName: {
        type: "string",
        description: "Updated last name",
        example: "Developer"
      },
      cellphone: {
        type: "string",
        description: "Updated cellphone number",
        example: "+52 7711234567"
      }
    }
  }
}