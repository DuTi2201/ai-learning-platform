const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function createInstructor() {
  try {
    console.log('Creating instructor...');
    
    const instructor = await prisma.instructor.create({
      data: {
        fullName: 'Test Instructor',
        title: 'Senior Developer',
        bio: 'Experienced instructor with 5+ years of teaching'
      }
    });
    
    console.log('✅ Created instructor:', instructor);
    
    // List all instructors
    const allInstructors = await prisma.instructor.findMany();
    console.log('\n📋 All instructors in database:');
    allInstructors.forEach(i => {
      console.log(`- ID: ${i.id}, Name: ${i.fullName}, Title: ${i.title}`);
    });
    
  } catch(error) {
    console.error('❌ Error creating instructor:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createInstructor();