import { NextResponse } from 'next/server';

// In a real application, this would be stored in a secure environment variable
// or a database with proper hashing, not in the code
const CORRECT_PASSWORD = 'gameaccess2023';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Validate the password
    const isValid = password === CORRECT_PASSWORD;
    
    // Add a small delay to prevent brute force attacks
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return the result
    return NextResponse.json({ 
      success: isValid,
      message: isValid ? 'Authentication successful' : 'Invalid password' 
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during authentication' 
    }, { status: 500 });
  }
} 