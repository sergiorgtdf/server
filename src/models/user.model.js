import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        roles: [
            {
                ref: "Role",
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Metodos para cifrar las pwd y compara para validar

// Utilizamos un metodo estatico, para no instanciar

userSchema.statics.encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
};

userSchema.statics.comparePasword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
