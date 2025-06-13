const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        role: 'STUDENT'
      }
    });
    console.log('✅ Created user:', user.id);
    
    // Create an instructor
    const instructor = await prisma.user.create({
      data: {
        email: 'instructor@example.com',
        name: 'Test Instructor',
        role: 'INSTRUCTOR'
      }
    });
    console.log('✅ Created instructor:', instructor.id);
    
    // Create a course
    const course = await prisma.course.create({
      data: {
        title: 'Sample Course',
        description: 'A sample course for testing UUID validation',
        price: 99.99,
        duration: 30,
        level: 'BEGINNER',
        category: 'Technology',
        instructorId: instructor.id
      }
    });
    console.log('✅ Created course:', course.id);
    
    // Create a module
    const module = await prisma.module.create({
      data: {
        title: 'Sample Module',
        description: 'A sample module for testing',
        courseId: course.id,
        orderIndex: 1
      }
    });
    console.log('✅ Created module:', module.id);
    
    // Create a lesson
    const lesson = await prisma.lesson.create({
      data: {
        title: 'Sample Lesson',
        content: 'This is a sample lesson content',
        moduleId: module.id,
        orderIndex: 1,
        duration: 15
      }
    });
    console.log('✅ Created lesson:', lesson.id);
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();