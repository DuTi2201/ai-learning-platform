"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const database_1 = require("./database");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { id: googleId, emails, displayName, photos } = profile;
        if (!emails || !emails[0]) {
            return done(new Error('No email found in Google profile'), undefined);
        }
        const email = emails[0].value;
        const profilePictureUrl = photos && photos[0] ? photos[0].value : null;
        let user = await database_1.prisma.user.findUnique({
            where: { googleId },
        });
        if (!user) {
            user = await database_1.prisma.user.create({
                data: {
                    googleId,
                    email,
                    fullName: displayName || email.split('@')[0],
                    profilePictureUrl,
                    role: 'USER',
                },
            });
        }
        else {
            if (user.profilePictureUrl !== profilePictureUrl) {
                user = await database_1.prisma.user.update({
                    where: { id: user.id },
                    data: { profilePictureUrl },
                });
            }
        }
        return done(null, user);
    }
    catch (error) {
        console.error('Error in Google OAuth strategy:', error);
        return done(error, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await database_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                googleId: true,
                email: true,
                fullName: true,
                profilePictureUrl: true,
                role: true,
                createdAt: true,
            },
        });
        if (!user) {
            return done(new Error('User not found'), null);
        }
        done(null, user);
    }
    catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map