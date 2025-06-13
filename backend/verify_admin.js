const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    console.log('🔍 Checking admin role for vuvanduong802@gmail.com...');
    
    const user = await prisma.user.findUnique({
      where: {
        email: 'vuvanduong802@gmail.com'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    
    if (user) {
      console.log('✅ User found:');
      console.log('   ID:', user.id);
      console.log('   Email:', user.email);
      console.log('   Name:', user.name);
      console.log('   Role:', user.role);
      console.log('   Created:', user.createdAt);
      
      if (user.role === 'ADMIN') {
        console.log('🎉 Admin role successfully updated!');
      } else {
        console.log('⚠️  Role is not ADMIN, current role:', user.role);
      }
    } else {
      console.log('❌ User not found with email: vuvanduong802@gmail.com');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();