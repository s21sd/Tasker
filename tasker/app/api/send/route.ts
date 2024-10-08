
import { EmailTemplate } from '@/app/component/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'sunnysrivastava258@gmail.com',
            to: ['srivastavasunny359@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
