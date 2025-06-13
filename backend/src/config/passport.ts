import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from './database';
import { User } from '../generated/prisma';

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id: googleId, emails, displayName, photos } = profile;
        
        if (!emails || !emails[0]) {
          return done(new Error('No email found in Google profile'), undefined);
        }

        const email = emails[0].value;
        const profilePictureUrl = photos && photos[0] ? photos[0].value : null;

        // Check if user already exists
        let user = await prisma.user.findUnique({
          where: { googleId },
        });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              googleId,
              email,
              fullName: displayName || email.split('@')[0],
              profilePictureUrl,
              role: 'USER', // Default role
            },
          });
        } else {
          // Update existing user's profile picture if it has changed
          if (user.profilePictureUrl !== profilePictureUrl) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { profilePictureUrl },
            });
          }
        }

        return done(null, user);
      } catch (error) {
        console.error('Error in Google OAuth strategy:', error);
        return done(error, undefined);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

export default passport;